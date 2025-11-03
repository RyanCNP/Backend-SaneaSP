import type { Request, Response } from "express"
import * as authService from "../services/auth.service"
import { ApiError } from "../errors/ApiError.error"
import { HttpCode } from "../enums/HttpCode.enum"
import { TCidadaoPayload } from "../interfaces/cidadao"

export const autenticar = async (req: Request, res: Response) => {
  const { email, senha } = req.body
  const token = await authService.authenticateUser(email, senha)
  res.status(200).json(token)
}

export const testeCadastroUsuarioComum = async(req: Request, res: Response) => {
  res.json({
    message : "Usuário cadastrado",
    data : req.newCommonUser
  })
}

export const cadastroCidadao = async(req: Request, res: Response) => {
 const transaction = req.transaction;
 if(!transaction) throw new ApiError('Nenhuma transaction fornecida', HttpCode.InternalServerError);

  try {
    const commonUser = req.newCommonUser;
    const {cep, bairro, cidade, numero, complemento, rua, telefone, cpf} = req.body;
    const newCitizen : TCidadaoPayload = {
      idUsuario : commonUser.idUsuario,
      cep, bairro, cidade, rua, numero, complemento, telefone, cpf
    };

    await authService.cadastroCidadao(newCitizen, commonUser, transaction);

    await transaction.commit();
    res.json({
      error: false,
      message: "Cadastro realizado! Verifique seu e-mail para poder criar suas denúncias.",
    });
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
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
