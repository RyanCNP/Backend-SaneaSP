import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { autenticar} from "../controllers/auth.controller";
import { ApiError } from "../errors/ApiError.error";
import { validateToken } from "../middlewares/auth.middleware";
dotenv.config();

export const authRoutes = express.Router();

authRoutes.post("/", async (req: Request, res: Response, next : NextFunction) => {
  try {
    const { email, senha } = req.body;
    const token = await autenticar(email, senha);
    res.status(200).json(token);
  } catch (error) {
   next(error);
  }
});

authRoutes.get("/me", validateToken, async (req: Request, res: Response, next : NextFunction) => {
  try {
    res.status(200).json(req.user)
  } catch (error) {
    next(error);
  }
});
