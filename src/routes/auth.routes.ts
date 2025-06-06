import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { autenticar, login } from "../controllers/auth.controller";
import { ApiError } from "../errors/ApiError.error";
import { validateToken } from "../middlewares/auth.middleware";
dotenv.config();

export const authRoutes = express.Router();

authRoutes.post("/", async (req: Request, res: Response) => {
  try {
    const { email, senha } = req.body;
    const token = await autenticar(email, senha);
    res.status(200).json(token);
  } catch (error) {
    //Verifica se o erro é uma ApiError
    if(error instanceof ApiError){
      res.status(error.httpStatus).json({
        message: error.message,
        error: true,
      });
    }
    else{
      res.status(500).json({
        message: "Ocorreu um erro de servidor: " + error,
        error: true,
      });
    }
  }
});

authRoutes.get("/me", validateToken, async (req: Request, res: Response) => {
  try {
    const token = req.headers["authorization"] as string;
    const user = await login(token);
    res.status(200).json(user);
  } catch (error) {
    if(error instanceof ApiError){
      res.status(error.httpStatus).json({
        message : error.message,
        error: true
      })
    }
    else{
      res.status(500).json({
        message : 'Ocorreu um erro de servidor' + error,
        error: true
      })
    }
  }
});
