console.log("Js funcionando");

let dados = [];

async function pegaDados() {
    const params = new URLSearchParams(window.location.search);
    const tipoUrl = params.get("tipo");
    const generoUrl = params.get("genero");
    const marcaUrl = params.get("marca");
    const modeloUrl = params.get("modelo");

    let url = new URL("http://localhost:3000/produtos");

    if (tipoUrl) { url.searchParams.append("tipo", tipoUrl) };
    if (generoUrl) { url.searchParams.append("genero", generoUrl) };
    if (marcaUrl) { url.searchParams.append("marca", marcaUrl) };
    if(modeloUrl) {url.searchParams.append("modelo", modeloUrl)};
    console.log(url);

    const res = await fetch(url);
    dados = await res.json();
}

pegaDados();

async function mostraDados() {
    const produtosDiv = document.getElementById("todosProdutos");

    dados.forEach(e => {
        produtosDiv.innerHTML += `
            <li>
                <a href="/src/produto/?id=${e._id}">
                    <img src="${e.urlImagem}" alt="${e.marca}">
                    <p id="nomeModelo">${e.modelo}</p>
                    <p>${e.marca}</p>
                    <h3>R$: ${e.preco}</h3>
                </a>
            </li>
        `;
    });

    ordenaPorPreco(dados);
    filtroCores(dados);
    filtraTamanhoLetras(dados);
    filtraTamanhoNumero(dados);
    definiTipoTamanho();
    mostraCarrinho();
}

function ordenaPorPreco(dados) {
    const botoes = document.querySelectorAll("#filtroPedido li button");
    const produtosDiv = document.getElementById("todosProdutos");

    botoes[0].addEventListener("click", (e) => {
        const dadosOrdenados = dados.sort((a, b) => a.preco - b.preco);

        produtosDiv.innerHTML = "";

        dadosOrdenados.forEach(e => {
            produtosDiv.innerHTML += `
            <li>
                <a href="/src/produto/?id=${e._id}">
                    <img src="${e.urlImagem}" alt="${e.marca}">
                    <p id="nomeModelo">${e.modelo}</p>
                    <p>${e.marca}</p>
                    <h3>R$: ${e.preco}</h3>
                </a>
            </li>
        `;
        });
    });

    botoes[1].addEventListener("click", (e) => {
        const dadosOrdenados = dados.sort((a, b) => b.preco - a.preco);

        produtosDiv.innerHTML = "";

        dadosOrdenados.forEach(e => {
            produtosDiv.innerHTML += `
            <li>
                <a href="/src/produto/?id=${e._id}">
                    <img src="${e.urlImagem}" alt="${e.marca}">
                    <p id="nomeModelo">${e.modelo}</p>
                    <p>${e.marca}</p>
                    <h3>R$: ${e.preco}</h3>
                </a>
            </li>
        `;
        });
    });
};

function filtroCores(dados) {
    const botoesCores = document.querySelectorAll("#filtroCores label");
    const produtosDiv = document.getElementById("todosProdutos");

    botoesCores.forEach(botao => {
        botao.addEventListener("click", (e) => {
            const cor = botao.attributes.for.value;
            const dadosFiltrados = dados.filter(produto => produto.cor == cor);

            produtosDiv.innerHTML = "";

            dadosFiltrados.forEach(e => {
                produtosDiv.innerHTML += `
                    <li>
                        <a href="/src/produto/?id=${e._id}">
                            <img src="${e.urlImagem}" alt="${e.marca}">
                            <p id="nomeModelo">${e.modelo}</p>
                            <p>${e.marca}</p>
                            <h3>R$: ${e.preco}</h3>
                        </a>
                    </li>
                `;
            });
        });
    });
};

function definiTipoTamanho() {
    const tipo = new URLSearchParams(window.location.search).get("tipo");

    if(tipo == "tenis" || tipo == undefined) {
        document.getElementById("filtroNumero").style.display="grid";
    };

    if(tipo == "camiseta" || tipo == "moletom" || tipo == undefined) {
        document.getElementById("filtroLetra").style.display="grid";
    };
};

function filtraTamanhoLetras(dados) {
    const botoes = document.querySelectorAll("#filtroLetra label");
    const produtosDiv = document.getElementById("todosProdutos");

    botoes.forEach(botao => {
        botao.addEventListener("click", (e) => {
            const tamanhoSelecionado = e.target.innerText;

            const dadosFiltrados = dados.filter(produto => {
                return produto.estoque.filter(item => item.tamanho == tamanhoSelecionado).length > 0;
            });

            console.log(dadosFiltrados);

            produtosDiv.innerHTML = "";

            dadosFiltrados.forEach(e => {
                produtosDiv.innerHTML += `
                    <li>
                        <a href="/src/produto/?id=${e._id}">
                            <img src="${e.urlImagem}" alt="${e.marca}">
                            <p id="nomeModelo">${e.modelo}</p>
                            <p>${e.marca}</p>
                            <h3>R$: ${e.preco}</h3>
                        </a>
                    </li>
                `;
            });
        });
    });
}

function filtraTamanhoNumero(dados) {
    const botoes = document.querySelectorAll("#filtroNumero input");
    const produtosDiv = document.getElementById("todosProdutos");

    botoes.forEach(botao => {
        botao.addEventListener("click", (e) => {
            const tamanhoSelecionado = e.target.attributes.id.value;

            const dadosFiltrados = dados.filter(produto => {
                return produto.estoque.filter(item => item.tamanho == tamanhoSelecionado).length > 0;
            });

            console.log(dadosFiltrados);
            produtosDiv.innerHTML = "";

            dadosFiltrados.forEach(e => {
                produtosDiv.innerHTML += `
                    <li>
                        <a href="/src/produto/?id=${e._id}">
                            <img src="${e.urlImagem}" alt="${e.marca}">
                            <p id="nomeModelo">${e.modelo}</p>
                            <p>${e.marca}</p>
                            <h3>R$: ${e.preco}</h3>
                        </a>
                    </li>
                `;
            });
        });
    });
}

async function pegaCarrinho() {
    const url = "http://localhost:3000/carrinho";

    const res = await fetch(url);
    return await res.json();
};

async function mostraCarrinho() {
    const num = document.querySelector("header p");

    const produtosCarrinho = await pegaCarrinho();
    console.log(produtosCarrinho.length);
    num.innerText = await produtosCarrinho.length;
};

function pesquisaModelo() {
    const inputRecebido = document.querySelector("#inputLi input").value;
    const url = `/src/produtos/?modelo=${inputRecebido}`;

    window.location.href = url;
};

document.querySelector("#inputLi i").addEventListener("click", () => {
    pesquisaModelo();
});

async function inicializar() {
    await pegaDados();
    mostraDados();
}

inicializar();