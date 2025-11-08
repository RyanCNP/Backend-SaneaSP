import { TCidadaoUpdate } from './../interfaces/cidadao';
import type { Request, Response } from "express"
import type { IUserListFilters } from "../interfaces/usuario"
import * as userService from "../services/user.service"
import { ApiError } from '../errors/ApiError.error';
import { HttpCode } from '../enums/HttpCode.enum';
import { TFuncionarioUpdate } from '../interfaces/funcionario';

export const getUsers = async (req: Request, res: Response) => {
  const userFilter = req.query as unknown as IUserListFilters
  const foundUsers = await userService.getUserList(userFilter)
  res.status(200).json(foundUsers)
}

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params
  const userFound = await userService.getUserById(Number(id))
  res.status(200).json(userFound)
}

export const getUserNameById = async (req: Request, res: Response) => {
  const { id } = req.params
  const userFound = await userService.getUserNameById(Number(id))
  res.status(200).json(userFound)
}

export const atualizaCidadao = async (req: Request, res: Response) => {
  const idUsuario  = Number(req.user.id)

  const body = req.body ?? {};
  const { cep, cidade, rua, bairro, numero, complemento, cpf, telefone } = body;

  if (Object.keys(body).length === 0) {
    throw new ApiError('Informe um dado para ser atualizado', HttpCode.BadRequest)
  }
  const citizenToUpdate : Partial<TCidadaoUpdate> = { cep, cidade, rua, bairro, complemento, numero, cpf, telefone}

  const updated = await userService.atualizaCidadao(idUsuario, citizenToUpdate)

  res.status(200).json({
    message : 'Seus dados foram atualizados com sucesso',
    error : false,
    data : updated
  })
}

export const atualizaFuncionario = async (req: Request, res: Response) => {
  const idUsuario  = Number(req.user.id)

  const body = req.body ?? {};
  const { nivel } = body;

  if (Object.keys(body).length === 0) {
    throw new ApiError('Informe um dado para ser atualizado', HttpCode.BadRequest)
  }
  const employeeToUpdate : Partial<TFuncionarioUpdate> = { nivel }

  const updated = await userService.atualizaFuncionario(idUsuario, employeeToUpdate)

  res.status(200).json({
    message : 'Seus dados foram atualizados com sucesso',
    error : false,
    data : updated
  })
}

export const deleteUser = async (req: Request, res: Response) => {
  const idUsuario  = Number(req.user.id)
  await userService.deleteUser(Number(idUsuario))
  res.status(200).json({
    message : 'Sua conta foi excluída com sucesso!'
  })
}


