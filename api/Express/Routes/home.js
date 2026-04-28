import express from "express";
const routerHome = express.Router();

routerHome.get("/", (req, res) => {
    try {
        res.status(200).send({Message: "Você tem acesso ao servidor"});
    } catch (erro) {
        res.status(500).send({erro: erro.message});
    };
});

export default routerHome;