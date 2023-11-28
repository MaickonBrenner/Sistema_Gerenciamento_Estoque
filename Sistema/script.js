
function cadastrarProduto() {
    
    event.preventDefault();

    var nome = document.getElementById("nome").value;
    var descricao = document.getElementById("descricao").value;
    var preco = document.getElementById("preco").value;
    var categoria = document.getElementById("categoria").value;

    
    
    if (nome.length < 4 || nome.length > 20) {
        alert("Você adicionou mais caracteres do que o permitido em 'nome'")
    } else if (preco < 0) {
        alert("Preço inválido!");
    } else if (categoria == "item0") {
        alert("Por favor, escolha a categoria!")
        
    } else {
        alert("O produto foi cadastrado com sucesso!")
        limparFormulario();
        redirecionarParaListaProdutos();
        adicionarProduto(nome,descricao,preco,categoria);
    }

    

};


function adicionarProduto(produto,desc,valor,cat){
    let novoProduto = {nome:produto, descricao:desc, preco:valor, categoria:cat};

    if(typeof(Storage) !== "undefined"){
        let produtos = localStorage.getItem("produtos");
        if(produtos == null) produtos = [];
        else produtos = JSON.parse(produtos);
        produtos.push(novoProduto);
        localStorage.setItem("produtos",JSON.stringify(produtos))
        alert("Produto cadastrado!")
        location.reload
    }

}

function listarEstoque(){
    if(typeof(Storage) !== "undefined"){
        let produtos = localStorage.getItem("produtos");
        if(produtos == null)
            document.write("<h3>Ainda não há nenhum item no estoque</h3>");
        else{
            produtos = JSON.parse(produtos);
            exibirListaProdutos(produtos);
        }
    }
}


function limparFormulario() {
    document.getElementById("nome").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("preco").value = "";
    document.getElementById("categoria").value = "item0";
}

function redirecionarParaListaProdutos() {
    window.location.href = 'ListaProdutos.html'; // Altere para o caminho correto da sua página ListaProdutos
}

function buscarProdutos() {
    var searchTerm = document.getElementById("search").value;
    // Lógica para buscar produtos com base no termo de pesquisa
    // Atualize a lista de produtos exibidos na página
    var listaProdutos = getTodosProdutos(); // Substitua por sua lógica real
    exibirListaProdutos(listaProdutos);
}


function cadastrarNovoProduto() {
    // Redireciona para a página de cadastro de produtos
    window.location.href = 'index.html'; // Substitua pelo caminho correto
}

function exibirListaProdutos(produtos) {
    var listaProdutosElement = document.getElementById("lista-produtos");
    listaProdutosElement.innerHTML = ""; // Limpa a lista antes de exibir novamente

    if (produtos.length === 0) {
        listaProdutosElement.innerHTML = "Nenhum produto encontrado.";
        return;
    }

    produtos.forEach(function(produto) {
        // Crie elementos HTML para exibir cada produto na lista
        var produtoElement = document.createElement("div");
        produtoElement.innerHTML = `
        <ul>
            <li><strong>Nome:</strong> ${produto.nome}</li>
            <li><strong>Descrição:</strong> ${produto.descricao}</li>
            <li><strong>Preço:</strong> ${produto.preco}</li>
            <li><strong>Categoria:</strong> ${produto.categoria}</li>
        </ul>
        <button onclick="atualizarProduto(${produto.id})">Atualizar</button>`;

        listaProdutosElement.appendChild(produtoElement);
    });
}

// Função fictícia para simular a lógica de obtenção de todos os produtos
function getTodosProdutos() {
    // Supondo que você tenha uma estrutura de dados de produtos
    // Substitua por sua lógica real
    return [
        { id: 1, nome: "Produto 1", descricao: "Descrição do Produto 1", preco: 19.99, categoria: "Categoria 1" },
        { id: 2, nome: "Produto 2", descricao: "Descrição do Produto 2", preco: 29.99, categoria: "Categoria 2" },
        // Adicione mais produtos conforme necessário
    ];
}

// Função fictícia para simular a lógica de atualização de um produto
function atualizarProduto(produtoId) {
    // Implemente a lógica para atualizar o produto com o ID fornecido
    // Redirecione para a página de atualização do produto
    window.location.href = 'AtualizarProduto.html?id=' + produtoId; // Substitua pelo caminho correto
}