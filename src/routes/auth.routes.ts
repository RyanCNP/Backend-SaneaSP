import express from "express";
import dotenv from "dotenv";
import { autenticar, cadastroCidadao, cadastroFuncionario, emailConfirmation, getAuthenticatedUser, testeCadastroUsuarioComum, lostPassword, resetPasswordTokenConfirmation, resetPassword } from "../controllers/auth.controller";
import { validateToken } from "../middlewares/auth.middleware";
import { userCreateMid } from "../middlewares/user-create.middleware";
import { userAlreadyExists } from "../middlewares/user-already-exists.middleware";
import { withTransaction } from "../middlewares/transaction.middleware";
import { UserType } from "../enums/UserType.enum";
dotenv.config();

export const authRoutes = express.Router();

//Login
authRoutes.post("/login", autenticar);

//Cadastro
authRoutes.post("/register", withTransaction, userAlreadyExists, userCreateMid(UserType.CIDADAO), testeCadastroUsuarioComum); //APENAS PARA TESTE
authRoutes.post("/register/cidadao", withTransaction, userAlreadyExists, userCreateMid(UserType.CIDADAO), cadastroCidadao);
authRoutes.post("/register/funcionario", withTransaction, userAlreadyExists, userCreateMid(UserType.FUNCIONARIO), cadastroFuncionario);
// authRoutes.post("/register/prefeitura", withTransaction, userExistsMid, userCreateMid(UserType.PREFEITURA), cadastroPrefeitura);

// Rota de confirmação e troca de senha
authRoutes.get("/registrationConfirm/:token", emailConfirmation);
authRoutes.post("/lost-password", lostPassword);
authRoutes.get("/lost-password/:token", resetPasswordTokenConfirmation);
authRoutes.put("/reset-password", resetPassword);

//Dados do usuário logado
authRoutes.get("/me", validateToken, getAuthenticatedUser);
