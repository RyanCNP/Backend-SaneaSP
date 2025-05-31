import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

export const authRoutes = express.Router();

authRoutes.post("/", (req: Request, res: Response) => {
    const { nome, senha } = req.body;
        
    //TODO: Consulta no banco de dados pelo usuário e senha recebidos 
    //TODO: Criptografia/descriptografia de senha

    if (nome === "admin" && senha === "admin") {
        const secret = process.env.SECRET_KEY || "";
        const token = jwt.sign({ nome: "admin" }, secret);
        res.status(200).json({ token });
    }
    res.status(401).send();
});
