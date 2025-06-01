import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

export const authorize = (req : Request, res : Response, next : NextFunction) => {
    const { authorization } = req.headers;
    const secret = process.env.SECRET_KEY || "";
    
    jwt.verify(authorization || "", secret, (err) => {
        if (err) {
            return res.status(401).json({
                message : 'Você não tem acesso a este recurso',
                error : true,
                log : err
            });
        }
        next();
    });
}