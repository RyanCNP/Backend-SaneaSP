import express from "express";
import dotenv from "dotenv";
import { autenticar, emailConfirmation, getAuthenticatedUser, registerUser } from "../controllers/auth.controller";
import { validateToken } from "../middlewares/auth.middleware";
dotenv.config();

export const authRoutes = express.Router();

//Login
authRoutes.post("/login", autenticar);
//Cadastro
authRoutes.post("/register", registerUser);
// Rota de confirmação de cadastro
authRoutes.get("/confirm/:token", emailConfirmation);
//Dados do usuário logado
authRoutes.get("/me", validateToken, getAuthenticatedUser);
