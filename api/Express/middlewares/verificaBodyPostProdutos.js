function verificaBodyPostProdutos(body) {

    if(body.marca == undefined) {throw new Error("Marca: não digitada")};
    if(typeof(body.marca) !== "string") {throw new Error("Marca: precisa ser uma String")};

    if(body.modelo == undefined) {throw new Error("Modelo: não digitado")};
    if(typeof(body.modelo) !== "string") {throw new Error("Modelo: precisa ser uma String")};

    if(body.tamanho == undefined) {throw new Error("Tamanho: não digitado")};
    if(typeof(body.tamanho) !== "string") {throw new Error("Tamanho: precisa ser uma String")};

    if(body.tipo == undefined) {throw new Error("Tipo: não digitado")};
    if(typeof(body.tipo) !== "string") {throw new Error("Tipo: precisa ser uma String")};

    if(body.cor == undefined) {throw new Error("Cor: não digitado")};
    if(typeof(body.cor) !== "string") {throw new Error("Cor: precisa ser uma String")};

    if(body.genero == undefined) {throw new Error("Genero: não digitado")};
    if(typeof(body.genero) !== "string") {throw new Error("Gênero: precisa ser uma String")};

    if(body.anoLancamento == undefined) {throw new Error("Ano lançamento: não digitado")};
    if(typeof(body.anoLancamento) !== "number") {throw new Error("Ano lançamento: precisa ser um numero")};
    if(body.anoLancamento < 0) {throw new Error("Ano lançamento: precisa ser um número maior que ZERO")};

    if(body.preco == undefined) {throw new Error("Preço: não digitado")};
    if(typeof(body.preco) !== "number") {throw new Error("Preço: precisa ser um numero")};
    if(body.preco < 0) {throw new Error("Preço: precisa ser um número maior que ZERO")};

    if(body.quantidade == undefined) {throw new Error("Qunatidade: não digitada")};
    if(typeof(body.quantidade) !== "number") {throw new Error("Qunatidade: precisa ser um número")};
    if(body.quantidade < 0) {throw new Error("Qunatidade: precisa ser um número maior que ZERO")};

    if(body.descricao == undefined) {throw new Error("Descrição: não digitada")};
    if(typeof(body.descricao) !== "string") {throw new Error("Descrição: precisa ser uma String")};
};

export default verificaBodyPostProdutos;