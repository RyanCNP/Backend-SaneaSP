import { Request, Response } from "express";
import { UserModel } from "../models/user.model";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { ApiError } from "../errors/ApiError.error";
import { HttpCode } from "../enums/HttpCode.enum";
import { uniqueUserValidator } from "./user.controller";
import { sendRegistrationEmail } from "../services/mail.service";
dotenv.config();

export const autenticar = async (req : Request, res : Response) => {
  const { email, senha } = req.body;
  const user = await UserModel.findOne({ where: { email } });

  if (!user) {
    throw new ApiError("Email ou senha estão incorretos", HttpCode.Unautorized);
  }

  const isMatch = await bcrypt.compare(senha, user.senha);

  if (!isMatch) {
    throw new ApiError("Email ou senha estão incorretos", HttpCode.Unautorized);
  }

  if (!user.verified) {
    throw new ApiError(
      "Cadastro ainda não confirmado. Verifique seu e-mail.",
      HttpCode.Unautorized
    );
  }

  const secretKey: string = process.env.SECRET_KEY || "";
  const expiresIn: any = process.env.EXPIRES_IN || "";

  if (!secretKey || !expiresIn) {
    console.warn(
      "❌ SECRET_KEY e EXPIRES_IN devem ser definidas, verifique o arquivo .env"
    );
    throw new Error("Erro interno de servidor");
  }

  const token = jwt.sign({ id: user.id }, secretKey, { expiresIn });

  
  res.status(200).json(token);
};

export const registerUser = async (req : Request, res : Response) => {
  const newUser = req.body;
  const salt = await bcrypt.genSalt(10);
  newUser.senha = await bcrypt.hash(newUser.senha, salt);

  await uniqueUserValidator(newUser);

  const user = await UserModel.create(newUser);

  const verificationToken = jwt.sign(
    { id: user.id },
    process.env.SECRET_KEY || "",
    { expiresIn: "24h" }
  );

  await sendRegistrationEmail(user, verificationToken)

  res.status(201).json({
    error: false,
    message: "Cadastro realizado! Verifique seu e-mail para ativar sua conta."
  });
};

export const emailConfirmation = async(req : Request, res : Response) => {
  const { token } = req.params;
  const secretKey = process.env.SECRET_KEY || "";
  const decoded: any = jwt.verify(token, secretKey);

  await UserModel.update(
    { verified: true },
    { where: { id: decoded.id } }
  );
  res.json({ message: "Conta verificada com sucesso!" });
}

export const getAuthenticatedUser = async (req : Request, res : Response) => {
  res.status(200).json(req.user)
}