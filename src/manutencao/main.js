console.log("Js funcionando");

const text = document.querySelector("h2");
let contador = 0;

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

setInterval(() => {
    switch (contador) {
        case 0: text.innerText = "Em manutenção.";
            contador++;
            break;
        case 1: text.innerText = "Em manutenção..";
            contador++;
            break;
        case 2: text.innerText = "Em manutenção...";
            contador = 0;
            break;
    };
}, 500)

function pesquisaModelo() {
    const inputRecebido = document.querySelector("#inputLi input").value;
    const url = `/src/produtos/?modelo=${inputRecebido}`;

    window.location.href = url;
};

document.querySelector("#inputLi i").addEventListener("click", () => {
    pesquisaModelo();
});

mostraCarrinho();