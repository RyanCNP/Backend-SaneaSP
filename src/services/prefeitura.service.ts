import { Op } from "sequelize"
import { ApiError } from "../errors/ApiError.error"
import { HttpCode } from "../enums/HttpCode.enum"
import { IPrefeitura, IPrefeituraFilter, TPrefeituraUpdate } from "../interfaces/prefeitura"
import { FuncionarioModel, PrefeituraModel } from "../models"
import { IUser } from "../interfaces/usuario"
import { NivelFuncionario } from "../enums/NivelFuncionario.enum"

const cityHallIncludes = [
  {
    model: FuncionarioModel,
    as: "funcionarios",
    attributes: {exclude : ["id_prefeitura"]}
  },
]

export const getCityHallList = async (cityHallFilter : IPrefeituraFilter): Promise<IPrefeitura[]> => {
  const query: any = { where: {}, include : cityHallIncludes}

  if (cityHallFilter.nomeOficial) {
    query.where.nomeOficial = { [Op.like]: `%${cityHallFilter.nomeOficial}%` }
  }

  const cityHalls = await PrefeituraModel.findAll(query)
  return cityHalls
}

export const getCityHallById = async (cityHallId: number): Promise<IPrefeitura> => {
  const foundCityHall = await PrefeituraModel.findByPk(cityHallId)

  if (!foundCityHall) {
    throw new ApiError("Nenhuma prefeitura encontrada", HttpCode.NotFound)
  }

  return foundCityHall
}

export const updateCityHall = async (
  cityHallId : IPrefeitura['id'],
  prefeituraUpdate: Partial<TPrefeituraUpdate>
) => {

  const foundCityHall = await PrefeituraModel.findByPk(cityHallId)

  if(!foundCityHall) throw new ApiError('Nenhuma prefeitura encontrada', HttpCode.NotFound)
  
  const payload = Object.fromEntries(
    Object.entries(prefeituraUpdate).filter(([_, v]) => v !== undefined)
  );

  await PrefeituraModel.update(payload, { where: {id : cityHallId} });
  
  const updated = await PrefeituraModel.findByPk(cityHallId)

  return updated;
}

export const deleteCityHall = async (cityHallId: string): Promise<void> => {
  const cityHallFound = await PrefeituraModel.findByPk(cityHallId)
  if (!cityHallFound) {
    throw new ApiError("Nenhuma prefeitura encontrada", HttpCode.NotFound)
  }
  
  await cityHallFound.destroy()
}