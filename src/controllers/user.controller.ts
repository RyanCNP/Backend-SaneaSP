import { TCidadaoPayload } from './../interfaces/cidadao';
import type { Request, Response } from "express"
import type { IUser, IUserListFilters, TUserPayload } from "../interfaces/usuario"
import * as userService from "../services/user.service"
import { TransactionNotProvided } from '../errors/TransactionNotProvided.error';

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
  const idUsuario  = Number(req.params.id)

  const {cep, cidade, rua, bairro, numero, complemento, cpf, telefone} = req.body
  const citizenToUpdate : TCidadaoPayload = {idUsuario ,cep, cidade, rua, bairro, complemento, numero, cpf, telefone}

  await userService.atualizaCidadao(citizenToUpdate)

  res.status(200).json()
}

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await userService.deleteUser(Number(id))
  res.status(200).json(result)
}
