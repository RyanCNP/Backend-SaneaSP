import { NextFunction, Request, Response } from "express";
import { ApiError } from "../errors/ApiError.error";
import { HttpCode } from "../enums/HttpCode.enum";
import { UserModel } from "../models";
import { Op } from "sequelize";

export const userAlreadyExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {email, nome} = req.body

  const userExists = await UserModel.findOne({
    where: {
      [Op.or]: [
        { email },
        { nome }
      ]
    },
    attributes : ['email', 'nome']
  })

  if(!userExists){
    return next()
  }

  if(userExists.email === email) 
    throw new ApiError('O email já está em uso', HttpCode.Conflict);

  if(userExists.nome === nome) 
    throw new ApiError('O nome já está em uso', HttpCode.Conflict);

  next();
};
