import { UserModel } from "../models/user.model"
import { Op, Transaction } from "sequelize"
import type { IUserListFilters, IUser, TUserPayload } from "../interfaces/usuario"
import { ApiError } from "../errors/ApiError.error"
import { HttpCode } from "../enums/HttpCode.enum"
import { CidadaoModel } from "../models"
import { TCidadaoPayload } from "../interfaces/cidadao"
import sequelize from "../config/database.config"

const userCitizenIncludes = [
  {
    model: CidadaoModel,
    as: "cidadao",
    attributes: {exclude : ["idUsuario"]}
  },
]

interface IUserExists {
    where: {
        [Op.or]: Array<Partial<Record<keyof IUserListFilters, string>>>; //Array com as chaves
    }
}

export const getUserList = async (userFilter: IUserListFilters): Promise<IUser[]> => {
  const query: any = { where: {}, include : userCitizenIncludes}

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

export const atualizaCidadao = async (
  cidadaoPayload: TCidadaoPayload
) => {
  const foundUser = await UserModel
  

  return updatedUser;
}

export const deleteUser = async (userId: number): Promise<IUser> => {
  const userFound = await UserModel.findByPk(userId)

  if (!userFound) {
    throw new ApiError("Nenhum usuário encontrado", HttpCode.NotFound)
  }

  await userFound.destroy()

  return userFound
}