import type { Request, Response } from "express"
import * as authService from "../services/auth.service"
import { ApiError } from "../errors/ApiError.error"
import { HttpCode } from "../enums/HttpCode.enum"

export const autenticar = async (req: Request, res: Response) => {
  const { email, senha } = req.body
  const token = await authService.authenticateUser(email, senha)
  res.status(200).json(token)
}

export const registerUser = async (req: Request, res: Response) => {
  const newUser = req.body
  const result = await authService.registerUser(newUser)
  res.status(201).json(result)
}

export const emailConfirmation = async (req: Request, res: Response) => {
  const { token } = req.params
  const result = await authService.confirmEmail(token)
  res.json(result)
}

export const getAuthenticatedUser = async (req: Request, res: Response) => {
  if (!req.user)
    throw new ApiError('Nenhum usuário encontrado', HttpCode.NotFound)
  res.status(200).json(req.user)
}
