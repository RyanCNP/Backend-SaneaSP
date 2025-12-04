import { NextFunction, Request, Response } from "express";
import { IUser, TUserPayload } from "../interfaces/usuario";
import { registerUser } from "../services/auth.service";
import { TransactionNotProvided } from "../errors/TransactionNotProvided.error";
import logger from "../../logger-winston";

export const userCreateMid = (tipo: IUser['tipo']) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.alert('Criando um novo usuario',{tipo,rota:'auth/registrer'});
  const { email, senha, nome } = req.body
  const transaction = req.transaction;

  if (!transaction) {
    logger.error('Ocorreu um problema ao criar o seu usuário',{tipo,rota:'auth/registrer'})
    throw new TransactionNotProvided('Ocorreu um problema ao criar o seu usuário');
  }

  const newUser: TUserPayload = {
    email, senha, nome, tipo
  }

  req.newCommonUser = (await registerUser(newUser, transaction)).getSafeUser()
  next();
};
