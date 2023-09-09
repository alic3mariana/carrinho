const produtos = [
    {
        //cria um array e declara seus valores
        id: "1",
        nome: "Informática para Internet: Interfaces Web II",
        prof: "Prof. Kelly",
        preco_de: 80,
        preco_por: 50,
        descricao: "O melhor curso de JavaScript",
        imagem: "./assets/1.png",
    },
    {
        //aqui declara os valores do segundo produto
        id: "2",
        nome: "Gestão de conteúdo Web II",
        prof: "Prof. Kelly",
        preco_de: 80,
        preco_por: 50,
        descricao: "O melhor curso de JavaScript",
        imagem: "./assets/3.png",  
    }
];

function renderizaProdutos(){
    // declara uma variável para guardar o html gerado
    let html = "";

    // intera sobre o array de produtos criado ali em cima
    for(let i = 0; i < produtos.length; i++){

        //chama a função "criarProduto()" para criar o html para cada produto
        html = html + criarProduto(produtos[i], i);
    }
    // retorna o html
    return html;
}

// declara a função "criarProduto()" dando os parâmetros do produto, e do html
function criarProduto(produto, index) {
    // retorna do html o "curso", a imagem inserida no script, as informações do curso, o nome do produto, professora e descrição
    // continua retornando as informações do produto, como preço dele, preço por produto e a ação do botão, onde vai adicionar a quantidade de produto selecionada quando clicado
    return `
    <div class = "curso">
    <img class = 'inicio' title="t" src="${produto.imagem}" />
    <div class = "curso-info">
      <h4>${produto.nome}</h4>
      <h4>${produto.prof}</h4>
      <h4>${produto.descricao}</h4>
      </div>
      <div class = "curso-preco">
      <span class="preco-de">R$${produto.preco_de}</span>
      <span class="preco-por">R$${produto.preco_por}</span>
      <button class="btncar btn-add" data-index="${index}"></button>
      </div>
      </div>
      `;
}

// seleciona o elemento id "#container" do html
const container = document.querySelector("#container")

//insere na página html pelo innerHTML o produto da função "renderizaProdutos()"
container.innerHTML = renderizaProdutos();

//cria uma constante em array dos items / produtos e adiciona no carrinho com todas as informações do produto por meio do "{}"
const carrinhoItens = {};

//cria a função renderizaCarrinho 
function renderizaCarrinho () {
    
    // declara uma variável para guardar o html gerado
    let html = '';

    // intera sobre o id dos produtos que estão guardados no array carrinhoItens
    for (let produtoId in carrinhoItens) {

        //adiciona no html gerado a função "criarItemCarrinho", aonde vai exibir juntamente com os atributos da função, os items que forem selecionados e armazenados em carrinhoItens pelo ID, ou seja, através do ID do produto, vai ser armazenado nessa variável e em seguida vai ser exibido juntamente com a função.
        //todas essas informações vão ser armazenadas na variável de html
        html = html + criaItemCarrinho(carrinhoItens[produtoId]);
    }

    //seleciona a div do html, com a classe de "carrinho_itens", exibe ela na página e atribui os valores da váriável de html, assim o que for definido nessa variável, irá representar a div do html
    document.querySelector('.carrinho_itens').innerHTML = html;
}

//cria a função "criarItemCarrinho()" dando como parâmetro o produto
function criaItemCarrinho(produto){
    
    //retorna dentro da div do html "carrinho_compra" os atributos do produto, como o nome, preço unitário, a quantodade de produto selecionada pelo usuário, o valor total a ser pago, por meio do calculo, onde o preço unitário do produto srrá multiplicado pela quantidade selecionada, por exemplo, se eu quiser dois cursos de R$50,00 cada, terei de pagar ao todo R$100,00, e, por fim o botão identifica pelo ID qual produto deve ser removido do carrinho quando for clicado
    return  `
    <div class = "carrinho_compra">
    <h4>${produto.nome}</h4>
    <p>Preço unidade: ${produto.preco_por} | Quantidade: ${produto.quantidade}</p>
    <p>Valor: R$: ${produto.preco_por*produto.quantidade}</p>
    <button data-produto-id="${produto.id}" class="btn-remove"> </button>
    </div>
    `;
}

//cria a função "criaCarrinhoTotal()" que vai calcular e exibir o total do carrinho
function criaCarrinhoTotal (){

    //cria uma variável que receberá o total, atribui o valor 0 pois ainda não tem valor, ele será adicionado no decorrer do código
    let total = 0;

    //percorre cada item no objeto carrinhoItens, que será identificado pelo ID do produto
    for (let produtoId in carrinhoItens) {

        //calcula o valor total daquele item e adiciona ao valor total geral, onde a variável de total, vai receber o ID do produto (produtoID) de dentro do carrinhoItens, identificando o preço unitário do produto, e multiplicar pela quantidade de produto selecionada, aclculando assim o valor total a ser pago
        total = total + carrinhoItens[produtoId].preco_por * carrinhoItens[produtoId].quantidade;
    }

    // o código atualiza o conteúdo do elemento HTML com a classe ".carrinho_total", através do querySelector
    document.querySelector('.carrinho_total').innerHTML = `
    <h4>Total: <strong> R$${total} </strong</h4>
    <a href ="#" target="_blank">
    <ion-icon name="card-outline"></ion-icon>
    <strong>Comprar Agora</strong
    </a>
    `;
}

    //cria a função "adicionarItemNoCarrinho()" onde o parâmetro será o produto
    function adicionaItemNoCarrinho(produto){

        //verifica se o produto que está sendo adicionado ainda não está no carrinho através do seu ID
        if (!carrinhoItens[produto.id]) {

            //adiciona o produto no carrinho, com seus atributos salvos dentro co carrinhoItens
            carrinhoItens[produto.id] = produto;

            //vai contar a quantidade de produtos que irão ser adicionados no carrinho, também pelo ID
            carrinhoItens[produto.id].quantidade = 0;
        }

        //a quantidade desse produto no carrinho é incrementada em 1,  pois ++ é utilizado para incrementar
        ++carrinhoItens[produto.id].quantidade;

        //são chamadas as funções "renderizaCarrinho()" e "criaCarrinhoTtoal()" para atualizar a exibição do carrinho e seu valor total na página, já que possívelmente foram adicionados mais produtos
        renderizaCarrinho();
        criaCarrinhoTotal();
    }

    //adiciona um evento de clique ao corpo do documento, ou seja, no index, pelo document. Quando ocorre um clique em qualquer lugar da página, a função fornecida como argumento será executada
        document.body.addEventListener('click' , function (event){

            //pega o elemento HTML que foi clicado durante o evento de clique e o armazena na variável elemento
            const elemento = event.target;

            //verifica se o elemento clicado possui a classe "btn-add". Se o elemento for um botão que adiciona um produto ao carrinho, o código dentro deste bloco será executado
            if(elemento.classList.contains('btn-add')) {

                //obtém o valor do atributo "data-index" do elemento clicado e converte ele em um número inteiro usando parseInt
                const index = parseInt(elemento.getAttribute('data-index'), 10);

                //obtém o produto correspondente ao índice obtido anteriormente no array produtos
                const produto = produtos[index];

                //chama a função "adicionaItemNoCarrinho()" para adicionar o produto ao carrinho de compras
                adicionaItemNoCarrinho(produto);
            }

            //verifica se o elemento clicado possui a classe "btn-remove". Se o elemento for um botão que remove um produto do carrinho, o código dentro deste bloco vai executar
            if (elemento.classList.contains('btn-remove')) {

                //pega o valor do atributo "data-produto-id" do elemento clicado
                const produtoId = elemento.getAttribute('data-produto-id');

                //verifica se a quantidade do produto no carrinho é menor ou igual a 1, e, se for ele irá executar
                if(carrinhoItens[produtoId].quantidade <= 1) {

                    //se sua quantidade for menor ou igual a um, ele irá remover o produto do carrinho
                    delete carrinhoItens[produtoId];
                    
                //se for maior que um, mas for clicado
                } else {

                    //irá remover um da quantidade total de produtos
                    --carrinhoItens[produtoId].quantidade;
                }

                //e em seguida vai chamar a função "renderizaCarrinho()" e vai atualizar exibição do carrinho na página
                renderizaCarrinho();

                //vai chamar a função "criaCarrinhoTotal()" para atualizar a compra total do carrinho do usuário
                criaCarrinhoTotal();
            }
        });