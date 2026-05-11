function filtrosProdutos(query) {
    let filtros = {};

    // FILTROS EXISTENTES
    if(query.id) {filtros._id = query.id};
    if(query.marca) {filtros.marca = query.marca};
    if(query.modelo) {filtros.modelo = query.modelo.toLowerCase().split(' ').map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1)).join(' ')};
    if(query.tamanho) {filtros.tamanho = query.tamanho};
    if(query.cor) {filtros.cor = query.cor};
    if(query.genero) {generoUnisex()};
    if(query.tipo) {filtros.tipo = query.tipo};

    // FILTROS INEXISTENTES
    function generoUnisex() {
        if(query.genero == "feminino") {
            filtros.genero = {$in: ["feminino", "unisex"]};
        } else

        if(query.genero == "masculino") {
            filtros.genero = {$in: ["masculino", "unisex"]};
        } else
        
        {
            filtros.genero = query.genero;
        };
    };

    return filtros;
};

export default filtrosProdutos;