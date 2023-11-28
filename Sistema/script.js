
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
    }

    

};

function limparFormulario() {
    document.getElementById("nome").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("preco").value = "";
    document.getElementById("categoria").value = "item0";
}