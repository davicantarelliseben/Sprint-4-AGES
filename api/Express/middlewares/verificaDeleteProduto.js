function verificaDeleteProduto(produtoDeletado) {

    if(produtoDeletado.deletedCount < 1) {throw new Error("Nenhum produto com esse id foi encontrado")};
};

export default verificaDeleteProduto;