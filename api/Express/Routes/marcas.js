import express from "express";
import { produtos } from "../../Mongo/schemas.js";

const routerMarcas = express.Router();

routerMarcas.get("/", async(req, res) => {
    try {
        const produtosDoBanco = await produtos.find({});
        let marcas = [];

        produtosDoBanco.forEach(p => {
            if(!marcas.includes(p.marca)) {marcas.push(p.marca)};
        });

        res.status(200).send(marcas.sort((a, b) => a.localeCompare(b)));
    } catch(erro) {
        res.status(500).send({Erro: erro.message});
    };
});

export default routerMarcas;