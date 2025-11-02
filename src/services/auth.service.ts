import { UserModel } from "../models/user.model"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { ApiError } from "../errors/ApiError.error"
import { HttpCode } from "../enums/HttpCode.enum"
import type { IUser, IUserPayload } from "../interfaces/usuario"
import { uniqueUserValidator } from "./user.service"
import { sendRegistrationEmail } from "./mail.service"
import { UserType } from "../enums/UserType.enum"

export const authenticateUser = async (email: string, senha: string): Promise<string> => {
  const user = await UserModel.findOne({ where: { email } })

  if (!user) {
    throw new ApiError("Email ou senha estão incorretos", HttpCode.Unautorized)
  }

  const isMatch = await bcrypt.compare(senha, user.senha)

  if (!isMatch) {
    throw new ApiError("Email ou senha estão incorretos", HttpCode.Unautorized)
  }

  if (!user.verified) {
    throw new ApiError("Cadastro ainda não confirmado. Verifique seu e-mail.", HttpCode.Unautorized)
  }

  const secretKey: string = process.env.SECRET_KEY || ""
  const expiresIn: any = process.env.EXPIRES_IN || ""

  if (!secretKey || !expiresIn) {
    console.warn("❌ SECRET_KEY e EXPIRES_IN devem ser definidas, verifique o arquivo .env")
    throw new Error("Erro interno de servidor")
  }

  const token = jwt.sign({ id: user.idUsuario }, secretKey, { expiresIn })

  return token
}

export const registerUser = async (newUser: IUserPayload): Promise<{ error: boolean; message: string }> => {
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

export const confirmEmail = async (token: string): Promise<{ message: string }> => {
  const secretKey = process.env.SECRET_KEY || ""
  const decoded: any = jwt.verify(token, secretKey)

  await UserModel.update({ verified: true }, { where: { idUsuario: decoded.id } })

  return { message: "Conta verificada com sucesso!" }
}
