import express from "express";
import { produtos } from "../../Mongo/schemas.js";
import filtroProdutos from "../middlewares/filtroProdutos.js";
import verificaBodyPostProdutos from "../middlewares/verificaBodyPostProdutos.js";
const routerProdutos = express.Router();

routerProdutos.get("/", async (req, res) => {
    try {
        const dadosRecebidos = req.query;
        let filtros = filtroProdutos(dadosRecebidos);

        res.status(200).send(await produtos.find(filtros));

    } catch(erro) {
        res.status(400).send({message: erro.message});
    };
});

routerProdutos.post("/", async (req, res) => {
    try {
        const dadosRecebidos = req.body;
        verificaBodyPostProdutos(dadosRecebidos);

        const produtoCriado = await produtos.create(dadosRecebidos);
        res.status(200).send(produtoCriado);
    } catch(erro) {
        res.status(400).send({Erro: erro.message});
    };
});

routerProdutos.put("/", async (req, res) => {
    try {
        const dadosRecebidos = req.body;

        const produtoModificado = await produtos.updateOne(
            {_id: dadosRecebidos.id},
            { $set: dadosRecebidos }
        );
        res.status(200).send(produtoModificado);
    } catch(erro) {
        res.status(400).send({Erro: erro.message});
    };
});

routerProdutos.delete("/", async (req, res) => {
    try {
        const dadosRecebidos = req.query;

        const produtoDeletado = await produtos.deleteOne({_id: dadosRecebidos.id});
        res.status(200).send(produtoDeletado);
    } catch(erro) {
        if(erro.name === "CastError") {res.status(400).send({Erro: "O id fornecido não existe"})};

        res.status(400).send({Erro: erro.message});
    };
});

export default routerProdutos;