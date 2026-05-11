console.log("Js funcionando");

let dados = [];

async function pegaDados() {
    let url = "http://localhost:3000/carrinho";

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

    console.log(dados);
};

async function inicializar() {
    await pegaDados();
    mostraDados();
}

inicializar();
