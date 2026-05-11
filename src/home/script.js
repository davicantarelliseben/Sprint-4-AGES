console.log("Js funcionando");

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

mostraCarrinho();