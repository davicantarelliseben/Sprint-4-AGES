import express from "express";
import conectaMongo from "../Mongo/ConectaMongo.js";
import routerProdutos from "./Routes/produtos.js";
import routerHome from "./Routes/home.js";
import routerMarcas from "./Routes/marcas.js";

const urlMongo = "mongodb+srv://BaltazarD:Mongao123@cluster0.u8yjii5.mongodb.net/stockx?appName=Cluster0";

const app = express();
const porta = 3000;

app.use(express.json());

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

// ROTA /PRODUTOS
app.use("/produtos", routerProdutos);

// ROTA /MARCAS
app.use("/marcas", routerMarcas);
