import mongoose from "mongoose";

async function conectaMongo(url) {
    mongoose.connect(url)
        .then(() => {console.log("Conectado ao MongoDB")})
        .catch((erro) => {throw new Error(erro)});
};

export default conectaMongo;