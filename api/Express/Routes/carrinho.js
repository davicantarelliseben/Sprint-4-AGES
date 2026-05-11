import express from "express";
import { carrinho } from "../../Mongo/schemas.js";

const routerCarrinho = express.Router();

routerCarrinho.get("/", async (req, res) => {
    try {
        const produtosDoBanco = await carrinho.find({});

        res.status(200).send(produtosDoBanco);
    } catch (erro) {
        res.status(500).send({ Erro: erro.message });
    };
});

routerCarrinho.post("/", async (req, res) => {
    try {
        const dadosRecebidos = req.body;
        const jaExiste = await carrinho.findById(dadosRecebidos._id);

        if (jaExiste) {throw new Error("Este produto já esta no carrinho")};

        const produtoCriado = await carrinho.create(dadosRecebidos);
        res.status(200).send(produtoCriado);
    } catch (erro) {
        res.status(500).send(erro.message);
    };
});

export default routerCarrinho;