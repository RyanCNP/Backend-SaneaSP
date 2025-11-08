import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import { ITokenDecode } from "../interfaces/token-decode";
import { jwtDecode } from "jwt-decode";
import { UserModel } from "../models/user.model";
import { ApiError } from "../errors/ApiError.error";
import { HttpCode } from "../enums/HttpCode.enum";
dotenv.config();

export const validateToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization'];
    const secret = process.env.SECRET_KEY || "";

    if (!token) {
        throw new ApiError('Faça login para ter acesso a esse recurso', HttpCode.Unautorized)
    }

    if (!secret) {
        console.warn('❌ SECRET_KEY deve ser definida, verifique o .env')
        throw new ApiError('Erro interno de servidor', HttpCode.InternalServerError);
    }

    let decoded: ITokenDecode;
    try {
        jwt.verify(token, secret);
        decoded = jwtDecode(token);
    } catch (error: any) {
        const cause = error.name === 'TokenExpiredError'
            ? 'Sua sessão expirou'
            : 'Login inválido';
        const message = `${cause}, faça login novamente`;
        throw new ApiError(message, HttpCode.Unautorized);
    }

    const user: UserModel | null = await UserModel.findByPk(decoded.id);
    if (!user) {
        throw new ApiError('Não autorizado. Usuário não encontrado', HttpCode.Unautorized)
    }

    req.user = user.getSafeUser();
    next();
}
