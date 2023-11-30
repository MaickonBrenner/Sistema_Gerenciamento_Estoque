

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
        redirecionarParaPagina('ListaProdutos.html');
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


function limparFormulario() {
    document.getElementById("nome").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("preco").value = "";
    document.getElementById("categoria").value = "item0";
}

function redirecionarParaPagina(caminho) {
    window.location.href = caminho;
}

function listarEstoque(){
    // Recupera a árvore do localStorage
    const arvoreSalva = localStorage.getItem('arvoreBinaria');

    // Cria uma instância da árvore binária
    let suaArvoreBinaria;
    if (arvoreSalva) {
        suaArvoreBinaria = ArvoreBinaria.criarArvoreAPartirDeJSON(JSON.parse(arvoreSalva));
        exibirListaProdutos(suaArvoreBinaria.obterTodosProdutos());
    } else {
        document.write("<h3>Ainda não há nenhum item no estoque</h3>");
    }
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
        <button class="button" onclick="atualizarProduto('${produto.nome}')">Atualizar</button>
        <button class="excluir-button" onclick="excluirProduto('${produto.nome}')">Excluir</button>`;

        listaProdutosElement.appendChild(produtoElement);
    });
}




function buscarProdutos() {
    var searchTerm = document.getElementById("search").value;

    // Recupera a árvore do localStorage
    const arvoreSalva = localStorage.getItem('arvoreBinaria');

    // Cria uma instância da árvore binária
    let suaArvoreBinaria;
    if (arvoreSalva) {
        suaArvoreBinaria = ArvoreBinaria.criarArvoreAPartirDeJSON(JSON.parse(arvoreSalva));

        // Realiza a busca na árvore
        const resultadoBusca = suaArvoreBinaria.buscar(searchTerm);

        // Exibe o resultado da busca
        if (resultadoBusca) {
            exibirListaProdutos([resultadoBusca]);
        }else if (searchTerm == ""){
            listarEstoque();
        }else {
            document.getElementById("lista-produtos").innerHTML = "Nenhum produto encontrado.";
        }
    } else {
        document.getElementById("lista-produtos").innerHTML = "Nenhum produto encontrado.";
    }
}

function excluirProduto(nome) {
    // Recupera a árvore do localStorage
    const arvoreSalva = localStorage.getItem('arvoreBinaria');

    // Cria uma instância da árvore binária
    let suaArvoreBinaria;
    if (arvoreSalva) {
        suaArvoreBinaria = ArvoreBinaria.criarArvoreAPartirDeJSON(JSON.parse(arvoreSalva));

        // Exclui o produto da árvore
        suaArvoreBinaria.excluir(nome);

        // Atualiza a árvore no localStorage
        localStorage.setItem('arvoreBinaria', JSON.stringify(suaArvoreBinaria));

        // Atualiza a lista de produtos
        listarEstoque();
    }
}


// Função fictícia para simular a lógica de atualização de um produto
function atualizarProduto(produtoNome) {

    // Redireciona para a página de lista de produtos
    redirecionarParaPagina('AtualizrProduto.html?nome='+produtoNome);
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


    obterTodosProdutos() {
        const listaProdutos = [];
        this.adicionarProdutosRecursivo(this.raiz, listaProdutos);
        return listaProdutos;
    }
    
    adicionarProdutosRecursivo(no, listaProdutos) {
        if (no !== null) {
            this.adicionarProdutosRecursivo(no.esquerda, listaProdutos);
            listaProdutos.push(no.produto);
            this.adicionarProdutosRecursivo(no.direita, listaProdutos);
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

    atualizarProduto(nomeProduto, descricao, preco, categoria) {
        // Buscar o nó correspondente ao nome do produto
        const noParaAtualizar = this.buscarRecursivo(this.raiz, nomeProduto);

        if (noParaAtualizar) {
            // Atualizar os detalhes do produto
            noParaAtualizar.produto.descricao = descricao;
            noParaAtualizar.produto.preco = preco;
            noParaAtualizar.produto.categoria = categoria;

            // Atualizar a árvore no localStorage
            localStorage.setItem('arvoreBinaria', JSON.stringify(this));

        }
    }
  
    encontrarMenorValor(no) {
      let atual = no;
      while (atual.esquerda !== null) {
        atual = atual.esquerda;
      }
      return atual.produto;
    }
  }
  

  