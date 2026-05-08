import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import User from "./models/User.js";
import path from "path";
import { fileURLToPath } from "url";
import jwt from "jsonwebtoken";
import morgan from "morgan";

dotenv.config();
const { MONGO_URI, TOKEN_KEY } = process.env;

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors())
app.use(express.json())
app.use(morgan("dev"))
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "../frontend/")))

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Conectado ao DB com sucesso!")
    } catch (err) {
        console.log("Erro ao se conectar:", err);
    }
}

connectDB();

// Validar token

app.get("/validar", async (req, res) => {
    const token = req.headers["authorization"].split(" ")[1];

    if (!token) return res.status(403).json({ acessoAutorizado: false });

    jwt.verify(token, TOKEN_KEY, (err) => {
        if (err) return res.status(403).json({ acessoAutorizado: false });

        res.status(200).json({ acessoAutorizado: true })
    })
})

app.post("/cadastro", async (req, res) => {
    try {
        const infoReq = req.body;
        const usuario = await User.findOne({ id: infoReq.id });
        if (usuario) {
            res.json({
                mensagem: "Usuário já existe"
            })
        } else {
            await User.create(infoReq)
        }
    } catch (e) {
        res.send(e)
    }
})

app.post("/login", async (req, res) => {
    try {
        const { id, senhaDigitada } = req.body;
        const { senha } = await User.findOne({ id }).exec();

        if(senhaDigitada === senha){
            const userToken = jwt.sign({ id }, TOKEN_KEY, {
                expiresIn: "1d"
            })
            res.json({ userToken })
        } else {
            console.log("Não-olá")
        }
    } catch (e) {
        res.send(e)
    }
})

app.listen(port, () => console.log(`Listening on port ${port}`))