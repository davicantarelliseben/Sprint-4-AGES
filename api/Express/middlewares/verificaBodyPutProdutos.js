function verificaBodyPutProdutos(dadosRecebidos) {

    if(
        dadosRecebidos.marca == null &&
        dadosRecebidos.modelo == null &&
        dadosRecebidos.tamanho == null &&
        dadosRecebidos.tipo == null &&
        dadosRecebidos.cor == null &&
        dadosRecebidos.genero == null &&
        dadosRecebidos.anoLancamento == null &&
        dadosRecebidos.preco == null &&
        dadosRecebidos.quantidade == null &&
        dadosRecebidos.descricao == null
    ) {throw new Error("Nenhum dados foi digitado para modificar")};
};

export default verificaBodyPutProdutos;