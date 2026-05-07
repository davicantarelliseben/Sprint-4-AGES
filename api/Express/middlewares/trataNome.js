function trataNome(dadosRecebidos) {
    const d = Array.isArray(dadosRecebidos) ? dadosRecebidos[0] : dadosRecebidos;

    let dados = {
        "marca": d.marca.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') || "",
        "modelo": d.modelo,
        "estoque": d.estoque,
        "tipo": d.tipo.toLowerCase(),
        "cor": d.cor.toLowerCase(),
        "genero": d.genero.toLowerCase(),
        "anoLancamento": d.anoLancamento,
        "preco": d.preco,
        "descricao": d.descricao,
        "urlImagem": d.urlImagem
    };

    return dados;
};

export default trataNome;