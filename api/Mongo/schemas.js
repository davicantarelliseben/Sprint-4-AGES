import mongoose from "mongoose";

const produtosSchema = new mongoose.Schema({
    marca: { type: String, required: true },
    modelo: { type: String, required: true },
    estoque: [{
        tamanho: {type: String, required: true},
        quantidade: {type: Number, required: true}   
    }],
    tipo: { type: String, required: true},
    cor: { type: String, required: true},
    genero: { type: String, required: true },
    anoLancamento: { type: Number, required: true },
    preco: { type: Number, required: true },
    descricao: { type: String, required: true },
    urlImagem: {type:String, required: true}
});

export const produtos = mongoose.model("produtos", produtosSchema);
