function filtrosProdutos(query) {
    let filtros = {};

    // FILTROS EXISTENTES
    if(query.id) {filtros._id = query.id};
    if(query.marca) {filtros.marca = query.marca};
    if(query.tamanho) {filtros.tamanho = query.tamanho};
    if(query.cor) {filtros.cor = query.cor};
    if(query.genero) {filtros.genero = query.genero};

    // FILTROS INEXISTENTES
    

    return filtros;
};

export default filtrosProdutos;