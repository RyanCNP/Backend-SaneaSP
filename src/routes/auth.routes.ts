import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { autenticar} from "../controllers/auth.controller";
import { validateToken } from "../middlewares/auth.middleware";
dotenv.config();

export const authRoutes = express.Router();

//Login
authRoutes.post("/", async (req: Request, res: Response) => {
  const { email, senha } = req.body;
  const token = await autenticar(email, senha);
  res.status(200).json(token);
});

//Dados do usuário logado
authRoutes.get("/me", validateToken, async (req: Request, res: Response) => {
  //req.user é obtido no middleware de autenticação
  res.status(200).json(req.user)
});
