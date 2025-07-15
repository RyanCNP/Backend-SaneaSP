import { UserModel } from "../models/user.model";
import jwt, { SignOptions } from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { ApiError } from "../errors/ApiError.error";
import { HttpCode } from "../enums/HttpCode.enum";
dotenv.config();

export const autenticar = async (email: string, password: string) => {
  const user = await UserModel.findOne({ where: { email } });

  const isMatch = user && (await bcrypt.compare(password, user.senha));

  if (!isMatch) {
    throw new ApiError("Email ou senha estão incorretos", HttpCode.Unautorized);
  }

  const secretKey : string = process.env.SECRET_KEY || "";
  const expiresIn : any = process.env.EXPIRES_IN || "";

  if (!secretKey || !expiresIn) {
    console.warn("❌ SECRET_KEY e EXPIRES_IN devem ser definidas, verifique o arquivo .env");
    throw new Error("Erro interno de servidor");
  }

  const token = jwt.sign(
    {id: user.id},
    secretKey,
    {expiresIn}
  );

  return token;
};
