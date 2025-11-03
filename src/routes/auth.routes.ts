import express from "express";
import dotenv from "dotenv";
import { autenticar, cadastroCidadao, emailConfirmation, getAuthenticatedUser, testeCadastroUsuarioComum } from "../controllers/auth.controller";
import { validateToken } from "../middlewares/auth.middleware";
import { userCreateMid } from "../middlewares/user-create.middleware";
import { userExistsMid } from "../middlewares/user-exists.middleware";
import { withTransaction } from "../middlewares/transaction.middleware";
dotenv.config();

export const authRoutes = express.Router();

//Login
authRoutes.post("/login", autenticar);

//Cadastro
authRoutes.post("/register", userExistsMid, userCreateMid, testeCadastroUsuarioComum); //APENAS PARA TESTE
authRoutes.post("/register/cidadao", withTransaction, userExistsMid, userCreateMid, cadastroCidadao);
// authRoutes.post("/register/funcionario", withTransaction, userExistsMid, userCreateMid, cadastroFuncionario);
// authRoutes.post("/register/prefeitura", withTransaction, userExistsMid, userCreateMid, cadastroPrefeitura);

// Rota de confirmação de cadastro
authRoutes.get("/confirm/:token", emailConfirmation);

//Dados do usuário logado
authRoutes.get("/me", validateToken, getAuthenticatedUser);
