import { UserModel } from "../models/user.model"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { ApiError } from "../errors/ApiError.error"
import { HttpCode } from "../enums/HttpCode.enum"
import type { TSafePassword, TSafeUser, TUserPayload } from "../interfaces/usuario"
import { TCidadaoPayload } from "../interfaces/cidadao"
import { CidadaoModel } from "../models"
import { sendLostPasswordEmail, sendRegistrationEmail } from "./mail.service"
import { Transaction } from "sequelize"
import { TFuncionarioPayload } from "../interfaces/funcionario"
import * as userService from "./user.service"
import { FuncionarioModel } from "../models/funcionario.model"

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
  return await UserModel.create(newUser, { transaction })
}

export const cadastroCidadao = async (newCidadao: TCidadaoPayload, user: TSafeUser, transaction?: Transaction): Promise<CidadaoModel> => {
  const verificationToken = jwt.sign({ id: user.id }, process.env.SECRET_KEY || "", { expiresIn: "1h" })

  await sendRegistrationEmail(user, verificationToken)

  return await CidadaoModel.create(newCidadao, { transaction })
}

export const cadastroFuncionario = async (newEmployee: TFuncionarioPayload, user: TSafeUser, transaction?: Transaction): Promise<FuncionarioModel> => {
  const verificationToken = jwt.sign({ id: user.id }, process.env.SECRET_KEY || "", { expiresIn: "1h" })

  await sendRegistrationEmail(user, verificationToken)

  return await FuncionarioModel.create(newEmployee, { transaction })
}

export const confirmEmail = async (token: string): Promise<{ message: string }> => {
  const secretKey = process.env.SECRET_KEY || ""
  const decoded: any = jwt.verify(token, secretKey)

  await UserModel.update({ verified: true }, { where: { id: decoded.id } })

  return { message: "Conta verificada com sucesso!" }
}

export const lostPassword = async (email: string): Promise<{ message: string }> => {
  const user = await UserModel.findOne({ where: { email } })

  if (!user) {
    throw new ApiError("Nenhum usuário encontrado", HttpCode.NotFound)
  }

  const verificationToken = jwt.sign({ id: user.id }, process.env.SECRET_KEY || "", { expiresIn: "1h" })

  await sendLostPasswordEmail(user, verificationToken);

  return { message: "Instruções enviadas para o seu e-mail!" }
}

export const resetPasswordContirmationToken = async (token: string) => {
  try {
    const secretKey = process.env.SECRET_KEY || ""
    const decoded = jwt.verify(token, secretKey) as { id: number }
    return { id: decoded.id }
  } catch {
    throw new ApiError("Token inválido ou expirado", HttpCode.Unautorized)
  }
}

export const resetPassword = async (token: string, newPassword: string): Promise<TSafePassword> => {
  if (!token) {
    throw new ApiError("Token ausente. A redefinição não pôde ser concluída.", HttpCode.BadRequest);
  }

  if (!newPassword || newPassword.trim().length < 6) {
    throw new ApiError("A senha deve conter pelo menos 6 caracteres.", HttpCode.BadRequest);
  }

  try {
    const secretKey = process.env.SECRET_KEY || "";
    const decoded = jwt.verify(token, secretKey) as { id: number };

    const user = await userService.getUserById(decoded.id);
    if (!user) {
      throw new ApiError("Usuário não encontrado.", HttpCode.NotFound);
    }

    const isSamePassword = await bcrypt.compare(newPassword, user.senha);
    if (isSamePassword) {
      throw new ApiError("A nova senha deve ser diferente da anterior.", HttpCode.BadRequest);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await UserModel.update({ senha: hashedPassword }, { where: { id: decoded.id } });

    return { id: user.id, senha: hashedPassword };
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      throw new ApiError("Token expirado. Solicite uma nova redefinição.", HttpCode.Unautorized);
    }
    if (error.name === "JsonWebTokenError") {
      throw new ApiError("Token inválido.", HttpCode.Unautorized);
    }
    throw new ApiError("Erro ao redefinir a senha.", HttpCode.InternalServerError);
  }
};