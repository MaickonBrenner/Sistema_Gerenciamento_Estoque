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


