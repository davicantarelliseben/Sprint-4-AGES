import express from "express";
import { produtos } from "../../Mongo/schemas.js";
import filtrosProdutos from "../middlewares/filtrosProdutos.js";
import verificaBodyPostProdutos from "../middlewares/verificaBodyPostProdutos.js";
import verificaDeleteProduto from "../middlewares/verificaDeleteProduto.js";
import verificaBodyPutProdutos from "../middlewares/verificaBodyPutProdutos.js";
import trataNome from "../middlewares/trataNome.js";
import mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;
const routerProdutos = express.Router();


// ENTREGA TUDO
routerProdutos.get("/", async (req, res) => {
    try {
        const dadosRecebidos = req.query;

        let filtros = filtrosProdutos(dadosRecebidos);
        const produtosEncontrados = await produtos.find(filtros).sort({modelo: 1})
        
        if(produtosEncontrados.length <= 0) {throw new Error("Nenhum produto encontrado")}

        res.status(200).send(produtosEncontrados);
    } catch(erro) {
        res.status(400).send({message: erro.message});
    };
});


// POSTA JSON
routerProdutos.post("/", async (req, res) => {
    try {
        let dadosRecebidos = req.body;
        dadosRecebidos = trataNome(dadosRecebidos);

        verificaBodyPostProdutos(dadosRecebidos);

        const produtoCriado = await produtos.create(dadosRecebidos);
        res.status(200).send(produtoCriado);
    } catch(erro) {
        res.status(400).send({Erro: erro.message});
    };
});

// MODIFICA JSON
routerProdutos.put("/", async (req, res) => {
    try {
        const dadosRecebidos = Array.isArray(req.body) ? req.body[0] : req.body;
        const id = req.query.id;

        verificaBodyPutProdutos(dadosRecebidos);

        const produtoModificado = await produtos.updateOne(
            { _id: new ObjectId(id) },
            { $set: dadosRecebidos }
        );

        if (produtoModificado.matchedCount === 0) {
            return res.status(404).send({ Erro: "Produto não encontrado." });
        }

        res.status(200).send(produtoModificado);
    } catch(erro) {
        res.status(400).send({ Erro: erro.message });
    }
});

// DELETA PELO ID
routerProdutos.delete("/", async (req, res) => {
    try {
        const dadosRecebidos = req.query;

        const produtoDeletado = await produtos.deleteOne({_id: dadosRecebidos.id});
        
        verificaDeleteProduto(produtoDeletado);

        res.status(200).send({message: `O produto de ID: ${dadosRecebidos.id} foi deletado com sucesso`});
    } catch(erro) {
        if(erro.name === "CastError") {res.status(400).send({Erro: "O id fornecido não existe"})};

        res.status(400).send({Erro: erro.message});
    };
});

export default routerProdutos;