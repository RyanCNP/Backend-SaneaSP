import express, {Request, Response } from "express";
import dotenv from "dotenv";
import { autenticar, registerUser} from "../controllers/auth.controller";
import { validateToken } from "../middlewares/auth.middleware";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.model";
dotenv.config();

export const authRoutes = express.Router();

//Login
authRoutes.post("/login", async (req: Request, res: Response) => {
  const { email, senha } = req.body;
  const token = await autenticar(email, senha);
  res.status(200).json(token);
});

//Cadastro
authRoutes.post("/register", async (req: Request, res: Response) => {
  try {
    const data = await registerUser(req.body);

    res.status(201).json({
      error: false,
      message: "Cadastro realizado! Verifique seu e-mail para ativar sua conta.",
      data,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: error.message || "Erro ao registrar usuário.",
    });
  }
});

// Rota de confirmação de cadastro
authRoutes.get("/confirm/:token", async (req: Request, res: Response) => {
  const { token } = req.params;

  try {
    const secretKey = process.env.SECRET_KEY || "";
    const decoded: any = jwt.verify(token, secretKey);

    await UserModel.update(
      { verified: true },
      { where: { id: decoded.id } }
    );

    res.json({ message: "Conta verificada com sucesso!" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Token inválido ou expirado." });
  }
});

//Dados do usuário logado
authRoutes.get("/me", validateToken, async (req: Request, res: Response) => {
  //req.user é obtido no middleware de autenticação
  res.status(200).json(req.user)
});
