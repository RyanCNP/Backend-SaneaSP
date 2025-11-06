import { UserModel } from "../models/user.model"
import { Op, Transaction } from "sequelize"
import type { IUserListFilters, IUser, TUserPayload } from "../interfaces/usuario"
import { ApiError } from "../errors/ApiError.error"
import { HttpCode } from "../enums/HttpCode.enum"
import { CidadaoModel } from "../models"
import { ICidadao, TCidadaoPayload, TCidadaoUpdate } from "../interfaces/cidadao"
import sequelize from "../config/database.config"
import { TFuncionarioUpdate } from "../interfaces/funcionario"
import { FuncionarioModel } from "../models/funcionario.model"

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
  idUsuario : IUser['idUsuario'],
  cidadaoUpdate: Partial<TCidadaoUpdate>
) => {

  const foundCitizen = await CidadaoModel.findOne({where : {idUsuario}})
  const foundUser = await UserModel.findByPk(idUsuario)

  if(!foundCitizen || !foundUser) throw new ApiError('Nenhum usuário encontrado', HttpCode.NotFound)
  
  const payload = Object.fromEntries(
    Object.entries(cidadaoUpdate).filter(([_, v]) => v !== undefined)
  );

  await CidadaoModel.update(payload, { where: { idUsuario } });
  
  const updatedCitizen = await CidadaoModel.findByPk(idUsuario);
  return updatedCitizen;
}

export const removeCidadao = async (
  idUsuario : IUser['idUsuario']
) => {
  const foundCitizen = await CidadaoModel.findByPk(idUsuario)
  const foundUser = await UserModel.findByPk(idUsuario)

  if(!foundCitizen || !foundUser) throw new ApiError('Nenhum usuário encontrado', HttpCode.NotFound)

  await CidadaoModel.destroy()
}

export const atualizaFuncionario = async (
  idUsuario : IUser['idUsuario'],
  funcionarioUpdate: Partial<TFuncionarioUpdate>
) => {

  const foundCitizen = await FuncionarioModel.findOne({where : {idUsuario}})
  const foundUser = await UserModel.findByPk(idUsuario)

  if(!foundCitizen || !foundUser) throw new ApiError('Nenhum usuário encontrado', HttpCode.NotFound)
  
  const payload = Object.fromEntries(
    Object.entries(funcionarioUpdate).filter(([_, v]) => v !== undefined)
  );

  await FuncionarioModel.update(payload, { where: { idUsuario } });
  
  const updatedEmployee = await FuncionarioModel.findByPk(idUsuario);
  return updatedEmployee;
}

export const removeFuncionario = async (
  idUsuario : IUser['idUsuario']
) => {
  const foundEmployee = await FuncionarioModel.findByPk(idUsuario)
  const foundUser = await UserModel.findByPk(idUsuario)

  if(!foundEmployee || !foundUser) throw new ApiError('Nenhum usuário encontrado', HttpCode.NotFound)

  await FuncionarioModel.destroy()
}

export const deleteUser = async (userId: number): Promise<IUser> => {
  const userFound = await UserModel.findByPk(userId)

  if (!userFound) {
    throw new ApiError("Nenhum usuário encontrado", HttpCode.NotFound)
  }

  await userFound.destroy()

  return userFound
}