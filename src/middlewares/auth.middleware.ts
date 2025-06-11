import { NextFunction, Request, Response } from "express";
import jwt, { JsonWebTokenError } from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

export const validateToken = (req : Request, res : Response, next : NextFunction) => {
    const token = req.headers['authorization']
    console.log(token)
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
        console.warn('❌ Secret Key deve ser definida no .env')
        return;
    }

    try {
        jwt.verify(token, secret);

        next()
    } catch (error) {
        if(error instanceof JsonWebTokenError){
            res.status(403).json({
                message : error.name == 'TokenExpiredError' 
                    ? 'Sua sessão expirou, faça login novamente' 
                    : 'Não conseguimos verificar seu acesso. Tente fazer login novamente',
                error : true
            });
        }
        else{
            console.warn('❌ Erro:' + error)
            res.status(500).json({
                message : 'Algo deu errado, tente novamente mais tarde',
                error : true
            });
        }
        return;
    }
}
