import express from "express";
import conectaMongo from "../Mongo/ConectaMongo.js";
import routerProdutos from "./Routes/produtos.js";
import routerHome from "./Routes/home.js";
import routerCarrinho from "./Routes/carrinho.js";

const urlMongo = "mongodb+srv://BaltazarD:Mongao123@cluster0.u8yjii5.mongodb.net/stockx?appName=Cluster0";

const app = express();
const porta = 3000;

app.use(express.json());

app.use((err, req, res, next) => {
    res.status(400).json({ erro: "Formato JSON inválido" });
});

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.listen(porta, async () => {

    try {
        await conectaMongo(urlMongo);
        console.log(`Servidor rodando na porta: http://localhost:${porta}`);

    } catch(erro) {
        console.log({Erro: erro.message});
    };
});

// ROTA /
app.use("/", routerHome);

// ROTA /produtos
app.use("/produtos", routerProdutos);

// ROTA /carrinho
app.use("/carrinho", routerCarrinho);
