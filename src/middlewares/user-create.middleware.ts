import { NextFunction, Request, Response } from "express";
import { TUserPayload } from "../interfaces/usuario";
import { registerUser } from "../services/auth.service";

export const userCreateMid = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {email, senha, nome, tipo} = req.body
  const transaction = req.transaction;

  const newUser : TUserPayload = {
    email, senha, nome, tipo
  }

  req.newCommonUser = (await registerUser(newUser, transaction)).getSafeUser()
  next();
};
