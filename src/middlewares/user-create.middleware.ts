import { NextFunction, Request, Response } from "express";
import { TUserPayload } from "../interfaces/usuario";
import { registerUser } from "../services/auth.service";
import { TransactionNotProvided } from "../errors/TransactionNotProvided.error";

export const userCreateMid = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {email, senha, nome, tipo} = req.body
  const transaction = req.transaction;

  if(!transaction) throw new TransactionNotProvided('Ocorreu um problema ao criar o seu usuário')

  const newUser : TUserPayload = {
    email, senha, nome, tipo
  }

  req.newCommonUser = (await registerUser(newUser, transaction)).getSafeUser()
  next();
};
