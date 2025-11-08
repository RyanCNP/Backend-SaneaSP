import { UserModel } from "../models/user.model"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { ApiError } from "../errors/ApiError.error"
import { HttpCode } from "../enums/HttpCode.enum"
import type { TSafeUser, TUserPayload } from "../interfaces/usuario"
import { TCidadaoPayload } from "../interfaces/cidadao"
import { CidadaoModel } from "../models"
import { sendRegistrationEmail } from "./mail.service"
import { Transaction } from "sequelize"
import { FuncionarioModel } from "../models/funcionario.model"
import { TFuncionarioPayload } from "../interfaces/funcionario"

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

  const token = jwt.sign({ id: user.id }, secretKey, { expiresIn })

  return token
}

export const registerUser = async (newUser: TUserPayload, transaction?: Transaction): Promise<UserModel> => {
  const salt = await bcrypt.genSalt(10)
  newUser.senha = await bcrypt.hash(newUser.senha, salt)
  return await UserModel.create(newUser, {transaction})
}

export const cadastroCidadao = async(newCidadao : TCidadaoPayload, user : TSafeUser, transaction ?: Transaction): Promise<CidadaoModel> => {
  const verificationToken = jwt.sign({ id: user.id }, process.env.SECRET_KEY || "", { expiresIn: "24h" })

  await sendRegistrationEmail(user, verificationToken)

  return await CidadaoModel.create(newCidadao, {transaction})
}

export const cadastroFuncionario = async(newEmployee : TFuncionarioPayload, user : TSafeUser, transaction ?: Transaction): Promise<FuncionarioModel> => {
  const verificationToken = jwt.sign({ id: user.id }, process.env.SECRET_KEY || "", { expiresIn: "24h" })

  await sendRegistrationEmail(user, verificationToken)

  return await FuncionarioModel.create(newEmployee, {transaction})
}

export const confirmEmail = async (token: string): Promise<{ message: string }> => {
  const secretKey = process.env.SECRET_KEY || ""
  const decoded: any = jwt.verify(token, secretKey)

  await UserModel.update({ verified: true }, { where: { id: decoded.id } })

  return { message: "Conta verificada com sucesso!" }
}
