function verificaBodyPutProdutos(dadosRecebidos) {
    // Vamos extrair os valores para facilitar a leitura
    const d = dadosRecebidos;

    if(
        (d.marca == null) &&
        (d.modelo == null) &&
        (d.estoque == null) &&
        (d.tipo == null) &&
        (d.cor == null) &&
        (d.genero == null) &&
        (d.anoLancamento == null) &&
        (d.preco == null) &&
        (d.descricao == null)
    ) {
        throw new Error("Nenhum dado foi digitado para modificar");
    }
}

export default verificaBodyPutProdutos;