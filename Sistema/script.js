

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
        
        
        adicionarProduto(nome,descricao,preco,categoria);
        limparFormulario();
        redirecionarParaListaProdutos();
    }

    

};


function adicionarProduto(produto,desc,valor,cat){
    let novoProduto = {nome:produto, descricao:desc, preco:valor, categoria:cat};
    
    const arvoreSalva = localStorage.getItem('arvoreBinaria');

    // Cria uma instância da árvore binária
    let suaArvoreBinaria;
    if (arvoreSalva) {
        suaArvoreBinaria = ArvoreBinaria.criarArvoreAPartirDeJSON(JSON.parse(arvoreSalva));
        suaArvoreBinaria.inserir(novoProduto);
    } else {
        suaArvoreBinaria = new ArvoreBinaria();
        suaArvoreBinaria.inserir(novoProduto);
    }

    localStorage.setItem('arvoreBinaria', JSON.stringify(suaArvoreBinaria));
    
    alert("O produto foi cadastrado com sucesso!")
    location.reload

  
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
    var listaProdutos = getTodosProdutos() // Substitua por sua lógica real
    //var listaProdutos = getTodosProdutos();
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


//ARVORE
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
class No {
    constructor(produto) {
      this.produto = produto;
      this.esquerda = null;
      this.direita = null;
    }
  }
  
  class ArvoreBinaria {
    constructor() {
      this.raiz = null;
    }

    static criarArvoreAPartirDeJSON(json) {
      const arvore = new ArvoreBinaria();
        if (json && json.raiz) {
            arvore.raiz = ArvoreBinaria.criarNoAPartirDeJSON(json.raiz);
        }
        return arvore;
    }

    static criarNoAPartirDeJSON(json) {
        if (!json) {
            return null;
        }
        const no = new No(json.produto);
        no.esquerda = ArvoreBinaria.criarNoAPartirDeJSON(json.esquerda);
        no.direita = ArvoreBinaria.criarNoAPartirDeJSON(json.direita);
        return no;
    }
  
    inserir(produto) {
      this.raiz = this.inserirRecursivo(this.raiz, produto);
    }
  
    inserirRecursivo(no, produto) {
      if (no === null) {
        return new No(produto);
      }
  
      // Comparação lexicográfica dos nomes dos produtos
      if (produto.nome < no.produto.nome) {
        no.esquerda = this.inserirRecursivo(no.esquerda, produto);
      } else if (produto.nome > no.produto.nome) {
        no.direita = this.inserirRecursivo(no.direita, produto);
      }
  
      return no;
    }
  
    buscar(nome) {
      return this.buscarRecursivo(this.raiz, nome);
    }
  
    buscarRecursivo(no, nome) {
      if (no === null || no.produto.nome === nome) {
        return no ? no.produto : null;
      }
  
      if (nome < no.produto.nome) {
        return this.buscarRecursivo(no.esquerda, nome);
      } else {
        return this.buscarRecursivo(no.direita, nome);
      }
    }
  
    excluir(nome) {
      this.raiz = this.excluirRecursivo(this.raiz, nome);
    }
  
    excluirRecursivo(no, nome) {
      if (no === null) {
        return null;
      }
  
      // Encontrar o nó a ser excluído
      if (nome < no.produto.nome) {
        no.esquerda = this.excluirRecursivo(no.esquerda, nome);
      } else if (nome > no.produto.nome) {
        no.direita = this.excluirRecursivo(no.direita, nome);
      } else {
        // Caso 1: Nó sem filhos ou apenas um filho
        if (no.esquerda === null) {
          return no.direita;
        } else if (no.direita === null) {
          return no.esquerda;
        }
  
        // Caso 3: Nó com dois filhos
        // Encontrar o sucessor em ordem (menor nó à direita)
        no.produto = this.encontrarMenorValor(no.direita);
  
        // Excluir o sucessor em ordem
        no.direita = this.excluirRecursivo(no.direita, no.produto.nome);
      }
  
      return no;
    }
  
    encontrarMenorValor(no) {
      let atual = no;
      while (atual.esquerda !== null) {
        atual = atual.esquerda;
      }
      return atual.produto;
    }
  }
  

  