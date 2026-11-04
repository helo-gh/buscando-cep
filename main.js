//1º PASSO - CAPTURANDO OS ELEMENTOS DO HTML

/*
O DUCUMENT REPRESENTA A PÁGINA HTML
GetElementById() procura um elemento pelo seu ID 
Aqui guardamos o formulário em uma váriavel para conseguir trabalhar com ele utilizando JavaScript
*/

let formCep = document.getElementById("form-cep");

let inputCep = document.getElementById("input-cep");

let resultado = document.getElementById("resultado");

//2º PASSO - IDENTIFICANDO O ENVIO DO FORMULÁRIO

/*
   addEvenListener() permite "escutar" acontecimentos dentro da página, chamado de eventos
   o evento "submit" acontece quando o formulário é enviado
   function(event) cria uma função que recebe informações sobre o evento que acabou de acontecer
*/

formCep.addEventListener("submit", function (event) {

    //event,preventDefalt() impede que a pagina se recarregue automaticamente

    event.preventDefault();

    /* 3º PASSO - CAPTURANDO E TRATANDO O CEP
    value - acessa o conteudo digitado dentro do input
    trim() remove os espaços em branco que estejam no inicio ou no final do texto
    */

    const cep = inputCep.value.trim()

    // 4º PASSO - VALIDANDO O CEP COM EXPRESSÃO REGULAR
    /*
    uma espressão regular é uma forma de definir um padrão que um texto precisa seguir

    ^ - indica o inicio do texto
    [0-9]  - permite qualquer numero de 0 a 9
    {8} - exige exatamente 8 numeros
    $ - indica o final do texto
    */

    const validarCep = /^[0-9]{8}$/

    /*
    5º - VERIFICAR SE O CEP É VALIDO

    test() verifica se o texto armazenado na variável cep corresponde ao padrão definido na expressão regular 
    ! - significa NÃO, estou verificando se o CEP NÃO corresponde ao padrão esperado
    */

    if (!validarCep.test(cep)) {
        resultado.innerHTML = '<p calss="erro"> Por favor digite um CEP válido com 8 números. <p/>'

        return
        //RETORNA e encerra a execução da função naquele momento

    }
    /*
    6º PASSO - MOSTRANDO UMA MENSAGEM DE CARREGAMENTO*/

    resultado.innerHTML = "<p>Buscando...<p/>"

    //7º PASSO - CONSUMIR A API VIA CEP 

    /*
    API é uma forma de um sistema coversar com o outro, para solicitar ou compartilhar informações

    fetch() é um recurso do JavaScript utilizado para fazer requisições externos, como APIs
     */

    fetch(`https://viacep.com.br/ws/${cep}/json/`)

        /*8º PASSO - TRANSFORMANDO A RESPOSTA EM JSON
        
        then() permite definir o que será executado quando a etapa anterior for concluída
        */
        .then(response => response.json())

        //9º PASSO - RECEBENDO OS DADOS DO ENDEREÇO
        /*aqui recebemos os dados que vieram da API 
        A variável data guarda as informação do endereço, coomo CEP, rua, bairro, cidade e estado*/

        .then(data => {

            //10º PASSSO - VERIFICANDO SE O CEP FOI ENCONTRADO 

            /*
            A API ViaCEP retorna uma propriedade chamado erro 
            quando o CEP não é encontrado
            */

            if (data.erro) {
                resultado.innerHTML = '<p class="erro">CEP não encontrado</p>'
                return
            }
            //11º PASSO - NOSTRAR OS DADOS NA TELA 
            resultado.innerHTML = `
   <h2>Resultado</h2>
   
   <p><strong>CEP:</strong>${data.cep}</p>

   <p><strong>Logradouro:<strong>${data.logradouro || "não encontrado"}</p>

   <p><strong>Bairro:<strong>${data.bairro || "não encontrado"}</p>

   <p><strong>Cidade:<strong>${data.localidade || "não encontrado"}</p>

   <p><strong>Estado:<strong>${data.estado || "não encontrado"}</p>
   `


        })
        .catch(() => {
            resultado.innerHTML = '<p class="erro"> Erro ao buscar o CEP. Tente novamente mais tarde</p>'
        })
})
