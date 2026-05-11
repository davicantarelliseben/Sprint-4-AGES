console.log("Js funcionando");

let guardaProduto;

async function pegaDados() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const url = `http://localhost:3000/produtos/?id=${id}`;

    const res = await fetch(url);
    return await res.json();
};

async function pegaDadosSimilares(tipo, id) {
    const url = `http://localhost:3000/produtos/?tipo=${tipo}`;
    const res = await fetch(url);

    const dados = await res.json();
    let contador = 0;

    dados.forEach(produto => {
        if (contador < 5) {
            if (produto._id !== id) {
                document.querySelector(".produtosDiv ul").innerHTML += `
                    <li>
                        <a href="/src/produto/?id=${produto._id}">
                            <img src="${produto.urlImagem}" alt="${produto.marca}">
                            <p id="nomeModelo">${produto.modelo}</p>
                            <p>${produto.marca}</p>
                            <h3>R$: ${produto.preco}</h3>
                        </a>
                    </li>
                `;
                contador++;
            };
        };
    });
};

async function mostraDados() {
    const dados = await pegaDados();
    const produto = dados[0];
    guardaProduto = produto;

    document.querySelector(".containerimagem img").src = produto.urlImagem;
    document.querySelector("h2").innerText = `${produto.marca} ${produto.modelo}`;
    document.querySelector("h3").innerText = produto.anoLancamento;
    document.querySelector(".infos h2").innerText = `R$: ${produto.preco}`;
    document.querySelector(".informaçõesfinais p").innerText = produto.descricao;

    await pegaDadosSimilares(produto.tipo, produto._id);
    let tamanhos = [];

    produto.estoque.forEach(t => {
        tamanhos.push(t.tamanho);
    });

    if (produto.tipo == "tenis") {
        for (let i = 35; i <= 44; i++) {
            console.log(tamanhos.includes(i));
            if (tamanhos.includes(String(i))) {
                document.querySelector(".tamanhos").innerHTML += `
                    <li>
                        <input type="radio" name="tamanho" id="tam${i}" value="${i}">
                        <label id="valueOn" for="tam${i}">${i}</label>
                    </li>
                `
            } else {
                document.querySelector(".tamanhos").innerHTML += `
                    <li>
                        <input type="radio" name="tamanho" id="tam${i}" value="${i}" disabled>
                        <label for="tam${i}">${i}</label>
                    </li>
                `
            }
        };
    } else

        if (produto.tipo == "camiseta" || produto.tipo == "moletom" || produto.tipo == "pelucia") {

            const tamanhosFor = ["PP", "P", "M", "G", "GG"];

            for (let i = 0; i < 5; i++) {
                if (tamanhos.includes(String(tamanhosFor[i]))) {
                    document.querySelector(".tamanhos").innerHTML += `
                    <li>
                        <input type="radio" name="tamanho" id="tam${tamanhosFor[i]}" value="${tamanhosFor[i]}">
                        <label id="valueOn" for="tam${tamanhosFor[i]}">${tamanhosFor[i]}</label>
                    </li>
                `
                } else {
                    document.querySelector(".tamanhos").innerHTML += `
                    <li>
                        <input type="radio" name="tamanho" id="tam${tamanhosFor[i]}" value="${tamanhosFor[i]}" disabled>
                        <label for="tam${tamanhosFor[i]}">${tamanhosFor[i]}</label>
                    </li>
                `
                };
            };
        };

    mostraCarrinho();
};

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

async function addCarrinho() {
    const botao = document.querySelector(".carrinho");
    const contadorProdutosCarrinho = document.querySelector("header p");

    botao.addEventListener("click", async () => {
        const url = "http://localhost:3000/carrinho";

        const resposta = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(guardaProduto)
        });

        if(resposta.status == 200) {contadorProdutosCarrinho.innerText = Number(contadorProdutosCarrinho.innerText) + 1};
        console.log(resposta.status);
    });
};

function pesquisaModelo() {
    const inputRecebido = document.querySelector("#inputLi input").value;
    const url = `/src/produtos/?modelo=${inputRecebido}`;

    window.location.href = url;
};

document.querySelector("#inputLi i").addEventListener("click", () => {
    pesquisaModelo();
});

addCarrinho();
mostraDados();