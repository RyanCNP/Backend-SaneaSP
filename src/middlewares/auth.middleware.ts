import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

export const authorize = (req : Request, res : Response, next : NextFunction) => {
    const token = req.headers['authorization']
    const secret = process.env.SECRET_KEY || "";
    
    if(!token){
        res.status(401).json({
            message : 'Acesso negado, é obrigatório o envio do token JWT'
        })
        return;
    }

    jwt.verify(token, secret, (err) => {
        if (err) {
            res.status(403).json({
                message : 'Token inválido',
                error : true,
                log : err
            });
            return;
        }
        next();
    });
}
