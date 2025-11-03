import { UserModel } from "../models/user.model"
import { Op } from "sequelize"
import type { IUserListFilters, IUser, TUserPayload } from "../interfaces/usuario"
import { ApiError } from "../errors/ApiError.error"
import { HttpCode } from "../enums/HttpCode.enum"

interface IUserExists {
    where: {
        [Op.or]: Array<Partial<Record<keyof IUserListFilters, string>>>; //Array com as chaves
    }
}

export const getUserList = async (userFilter: IUserListFilters): Promise<IUser[]> => {
  const query: any = { where: {} }

  if (userFilter.nome) {
    query.where.nome = { [Op.like]: `%${userFilter.nome}%` }
  }

  if (userFilter.email) {
    query.where.email = { [Op.like]: `%${userFilter.email}%` }
  }

  const users = await UserModel.findAll(query)
  return users
}

export const getUserById = async (userId: number): Promise<IUser> => {
  const foundUser = await UserModel.findOne({ where: { idUsuario: userId } })

  if (!foundUser) {
    throw new ApiError("Nenhum usuário encontrado", HttpCode.NotFound)
  }

  return foundUser
}

export const getUserNameById = async (userId: number): Promise<string> => {
  const foundUser = await UserModel.findOne({ where: { idUsuario: userId }, attributes : ["nome"]})

  if (!foundUser) {
    throw new ApiError("Nenhum usuário encontrado", HttpCode.NotFound)
  }

  return foundUser.nome
}

export const getUserByName = async (userName: string): Promise<IUser> => {
  const foundUser = await UserModel.findOne({ where: { nome: userName } })

  if (!foundUser) {
    throw new ApiError("Nenhum usuário encontrado", HttpCode.NotFound)
  }

  return foundUser
}

export const updateUser = async (idUsuario: number, updatedUser: TUserPayload): Promise<IUser> => {
  const userFound = await UserModel.findOne({ where: { idUsuario } })

  if (!userFound) {
    throw new ApiError("Nenhum usuário encontrado", HttpCode.NotFound)
  }

  await uniqueUserValidator(updatedUser, idUsuario)

  return await userFound.update(updatedUser)
}

export const deleteUser = async (userId: number): Promise<IUser> => {
  const userFound = await UserModel.findByPk(userId)

  if (!userFound) {
    throw new ApiError("Nenhum usuário encontrado", HttpCode.NotFound)
  }

  await userFound.destroy()

  return userFound
}

export const uniqueUserValidator = async (user : TUserPayload, idUsuario?: number): Promise<void> => {
  const query: IUserExists = {
    where: {
      [Op.or]: [],
    },
  }

  if (user.nome)
    query.where[Op.or].push({ nome: user.nome })

  if (user.email)
    query.where[Op.or].push({ email: user.email })

  const userFound = await UserModel.findOne(query)

  if (!userFound) return

  if (userFound.idUsuario != idUsuario) {
    if (userFound.nome.trim() == user.nome.trim()) {
      throw new ApiError("Já existe um usuário com esse nome", HttpCode.Conflict)
    }

    if (userFound.email.trim() == user.email.trim()) {
      throw new ApiError("Esse email já está em uso", HttpCode.Conflict)
    }
  }
}