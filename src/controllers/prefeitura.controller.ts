import type { Request, Response } from "express"
import { ApiError } from '../errors/ApiError.error';
import { HttpCode } from '../enums/HttpCode.enum';
import * as prefeituraService from "../services/prefeitura.service"
import { IPrefeituraFilter, TPrefeituraUpdate } from "../interfaces/prefeitura";

export const getCityHalls = async (req: Request, res: Response) => {
  const cityHallFilter = req.query as unknown as IPrefeituraFilter
  const found = await prefeituraService.getCityHallList(cityHallFilter)
  res.status(200).json(found)
}

export const getCityHallById = async (req: Request, res: Response) => {
  const { id } = req.params
  const found = await prefeituraService.getCityHallById(Number(id))
  res.status(200).json(found)
}

export const updateCityHall = async (req: Request, res: Response) => {
  const cityHallId = Number(req.params.id)

  const body = req.body ?? {};
  const { bairro, cep, cidade, cnpj, descricao, emailInstitucional, logo, nomeOficial, numero, rua, statusAssinatura, complemento } = body as TPrefeituraUpdate;

  if (Object.keys(body).length === 0) {
    throw new ApiError('Informe um dado para ser atualizado', HttpCode.BadRequest)
  }
  
  const cityHallToUpdate : Partial<TPrefeituraUpdate> = { bairro, cep, cidade, cnpj, descricao, emailInstitucional, logo, nomeOficial, numero, rua, statusAssinatura, complemento}

  const updated = await prefeituraService.updateCityHall(cityHallId, cityHallToUpdate)

  res.status(200).json({
    message : 'Os dados da prefeitura foram atualizados com sucesso',
    error : false,
    data : updated
  })
}

export const deleteCityHall = async (req: Request, res: Response) => {
  const { id } = req.params

  await prefeituraService.deleteCityHall(id)
  res.status(200).json({
    message : 'Prefeitura foi excluída com sucesso!'
  })
}

