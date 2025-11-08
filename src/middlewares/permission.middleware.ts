import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { ApiError } from "../errors/ApiError.error";
import { HttpCode } from "../enums/HttpCode.enum";
import { FuncionarioModel } from "../models";
import { NivelFuncionario } from "../enums/NivelFuncionario.enum";
dotenv.config();

export const permissionMid = (...permissions : NivelFuncionario[]) => async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user.id
    if(!userId) 
        throw new ApiError('Nenhum usuário encontrado, faça login para ter acesso', HttpCode.NotFound)
    
    const employee = await FuncionarioModel.findOne({where : {idUsuario : userId }})

    if(!employee)
        throw new ApiError(`Apenas funcionários tem acesso a esse recurso`, HttpCode.Unautorized)
    
    if(!permissions.includes(employee.nivel)) 
        throw new ApiError(`Apenas funcionários ${permissions.join(', ')} tem acesso a esse recurso`, HttpCode.Unautorized)
    
    next();
}
