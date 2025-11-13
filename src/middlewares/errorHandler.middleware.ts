import { NextFunction, Request, Response } from "express";
import { ApiError } from "../errors/ApiError.error";
import { TransactionNotProvided } from "../errors/TransactionNotProvided.error";
import { HttpCode } from "../enums/HttpCode.enum";

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof ApiError) {
        res.status(error.httpCode).json({
            error: true,
            message: error.message,
        });
        return;
    }

    if(error instanceof TransactionNotProvided){
        res.status(HttpCode.InternalServerError).json({
            error: true,
            message: error.message,
            errors: {
                message: "Nenhuma transaction foi fornecida. Utilize o middleware withTransaction para iniciar uma transação ou crie uma transaction"
            }
        });
        return;
    }
    
    console.error(`[${new Date().toISOString()}] Erro em ${req.method} ${req.path}:`, error);

    res.status(500).json({
        error: true,
        message: `Ocorreu um erro inesperado, tente novamente`,
    });
}