import { IUserCreationAttributes, UserModel } from "../models/user.model";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { ApiError } from "../errors/ApiError.error";
import { HttpCode } from "../enums/HttpCode.enum";
import { IUser } from "../interfaces/usuario";
import { uniqueUserValidator } from "./user.controller";
import { transporter } from "../config/nodemailer.config";
import fs from "fs";
import path from "path";
dotenv.config();

export const autenticar = async (email: string, password: string) => {
  const user = await UserModel.findOne({ where: { email } });

  const isMatch = user && (await bcrypt.compare(password, user.senha));

  if (!isMatch) {
    throw new ApiError("Email ou senha estão incorretos", HttpCode.Unautorized);
  }

  const secretKey: string = process.env.SECRET_KEY || "";
  const expiresIn: any = process.env.EXPIRES_IN || "";

  if (!secretKey || !expiresIn) {
    console.warn("❌ SECRET_KEY e EXPIRES_IN devem ser definidas, verifique o arquivo .env");
    throw new Error("Erro interno de servidor");
  }

  const token = jwt.sign(
    { id: user.id },
    secretKey,
    { expiresIn }
  );

  return token;
};

export const registerUser = async (newUser: IUserCreationAttributes) => {
  const salt = await bcrypt.genSalt(10);
  newUser.senha = await bcrypt.hash(newUser.senha, salt);

  await uniqueUserValidator(newUser);

  const user = await UserModel.create(newUser);

  const verificationToken = jwt.sign(
    { id: user.id },
    process.env.SECRET_KEY || "",
    { expiresIn: "24h" }
  );

  const templatePath = path.join(__dirname, "..", "templates", "confirmationEmail.html");
  let html = fs.readFileSync(templatePath, "utf-8");

  const confirmationLink = `${process.env.APP_URL}/auth/confirm/${verificationToken}`;
  html = html.replace(/{{nome}}/g, user.nome).replace(/\[LINK_CONFIRMACAO\]/g, confirmationLink);

  await transporter.sendMail({
    from: `"SaneaSP" <${process.env.SMTP_USER}>`,
    to: user.email,
    subject: "Confirme seu cadastro - SaneaSP",
    html,
  });

  return user;
};
