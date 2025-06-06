import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

export const validateToken = (req : Request, res : Response, next : NextFunction) => {
    const token = req.headers['authorization']
    const secret = process.env.SECRET_KEY || "";

    if(!token){
        res.status(401).json({
            message : 'Acesso negado, é obrigatório o envio do token JWT',
            error : true
        })
        return;
    }

    if(secret == ""){
        res.status(500).json({
            message : 'Erro interno de servidor',
            error : true
        })
        console.error('❌ Secret Key deve ser definida no .env')
        return;
    }

    try {
        jwt.verify(token, secret)
        next()
    } catch (error) {
        res.status(403).json({
            message : 'Token inválido',
            error : true,
        });
    }
}
