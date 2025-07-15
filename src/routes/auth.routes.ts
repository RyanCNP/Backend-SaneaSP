import express, {Request, Response } from "express";
import dotenv from "dotenv";
import { autenticar, registerUser} from "../controllers/auth.controller";
import { validateToken } from "../middlewares/auth.middleware";
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
    const body = req.body;
    const data = await registerUser(body);

    res.status(201).json({
        error: false,
        message: "Cadastro realizado com sucesso",
        data
    });
});

//Dados do usuário logado
authRoutes.get("/me", validateToken, async (req: Request, res: Response) => {
  //req.user é obtido no middleware de autenticação
  res.status(200).json(req.user)
});
