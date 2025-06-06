import express, { Request, Response } from "express";
import jwt from "jsonwebtoken"
import dotenv from "dotenv";
import { autenticar, login } from "../controllers/auth.controller";
dotenv.config();

export const authRoutes = express.Router();

authRoutes.post("/", async (req: Request, res: Response) => {
  try {
    const { email, senha } = req.body;

    const user = await autenticar(email, senha);

    if (!user) {
      res.status(404).json({
        message: "Usuário não encontrado",
        error: true,
      });
      return;
    }

    const secret = process.env.SECRET_KEY || "";
    const token = jwt.sign(
      {
        id: user.id,
      },
      secret
    );
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({
      message: "Ocorreu um erro de servidor: " + error,
      error: true,
    });
  }
});

authRoutes.get("/me", async (req: Request, res: Response) => {
  const token = req.headers["authorization"] || "";
  if (!token) {
    res.status(401).json({
        message : 'Token inválido',
        error: true
    });
  }

  const user = await login(token);
  if (!user) {
    res.status(404).json({
      message: "Login não encontrado",
      error: true,
    });
  }
  res.status(200).json(user);
});
