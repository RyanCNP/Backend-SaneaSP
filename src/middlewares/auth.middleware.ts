import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import { ITokenDecode } from "../interfaces/ITokenDecode.interface";
import { jwtDecode } from "jwt-decode";
import { UserModel } from "../models/user.model";
import { JsonWebTokenError } from "jsonwebtoken";
dotenv.config();

export const validateToken = async (req : Request, res : Response, next : NextFunction) => {
    const token = req.headers['authorization'];

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

        const decoded : ITokenDecode = jwtDecode(token)
        const user : UserModel | null = await UserModel.findByPk(decoded.id);

        if(!user){
            res.status(401).json({
                message: "Não autorizado. Usuário não encontrado",
                error : true
            })
            return;
        }

        const plainUser = user.get({plain:true})
        const {senha : senha, ...loggedUser } = plainUser

        
        req.user = loggedUser

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
            res.status(500).json({
                message : 'Algo deu errado, tente novamente mais tarde',
                error : true
            });
        }
        console.warn('❌ Erro:' + error)
        return;
    }
}
