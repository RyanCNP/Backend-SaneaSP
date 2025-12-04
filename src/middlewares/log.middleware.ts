import { NextFunction, Request, Response } from "express";
import logger from "../../logger-winston";

export const logHandler = (req:Request,res:Response, next:NextFunction)=>{
    logger.info(`Entrando na Rota de ${req.originalUrl}`,{method:req.method,path:req.path})
    next();
}