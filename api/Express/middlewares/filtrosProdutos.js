function filtrosProdutos(query) {
    let filtros = {};

    if(query.id) {filtros._id = query.id};
    if(query.marca) {filtros.marca = query.marca};
    if(query.tamanho) {filtros.tamanho = query.tamanho};
    if(query.cor) {filtros.cor = query.cor};
    if(query.genero) {filtros.genero = query.genero};

    return filtros;
};

export default filtrosProdutos;