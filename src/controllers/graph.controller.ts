import type { Request, Response } from "express"
import type { IGraphFilter } from "../interfaces/graph"
import * as graphService from "../services/graph.service"

export const getMaioresPontuacoes = async (req: Request, res: Response) => {
  const {bairro, cidade, dataFinal, dataInicio, limit, pontuacao, status} = req.query as IGraphFilter

  const filter : IGraphFilter = {
    bairro,
    cidade,
    dataFinal,
    dataInicio,
    limit,
    pontuacao,
    status
  }

  const result = await graphService.getBigPoints(filter)
  res.json(result)
}

export const getCidades = async (req: Request, res: Response) => {
  const cities = await graphService.getCities()
  res.json(cities);
}
