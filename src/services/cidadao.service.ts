import bcrypt from "bcryptjs/umd/types";
import { UserType } from "../enums/UserType.enum";
import { TUserPayload } from "../interfaces/usuario";
import { UserModel } from "../models";
import { sendRegistrationEmail } from "./mail.service";
import { uniqueUserValidator } from "./user.service";
import jwt from "jsonwebtoken"

export const cadastroCidadao = async (newUser: TUserPayload): Promise<{ error: boolean; message: string }> => {
  const salt = await bcrypt.genSalt(10)
  newUser.senha = await bcrypt.hash(newUser.senha, salt)

  //SOLUÇÃO MOMENTÂNEA -> PRECISO FAZER O FRONT MANDAR CERTO
  if(!newUser.tipo) newUser.tipo = UserType.CIDADAO
  await uniqueUserValidator(newUser)

  const user = await UserModel.create(newUser)

  const verificationToken = jwt.sign({ id: user.idUsuario }, process.env.SECRET_KEY || "", { expiresIn: "24h" })

  await sendRegistrationEmail(user, verificationToken)

  return {
    error: false,
    message: "Cadastro realizado! Verifique seu e-mail para ativar sua conta.",
  }
}