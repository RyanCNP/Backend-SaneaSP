import { NextFunction, Request, Response } from "express";
import { ApiError } from "../errors/ApiError.error";

export const errorHandler = (error : Error, req : Request, res : Response, next : NextFunction) => {
    
    if(error instanceof ApiError){
        res.status(error.httpCode || 500).json({
            error: true,
            message: error.message,
        });
        return;
    }

    console.error(`[${new Date().toISOString()}] Erro em ${req.method} ${req.path}:`, error);
    
    res.status(500).json({
        error: true,
        message: `Ocorreu um erro inesperado, tente novamente`,
    });
}