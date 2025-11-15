import sequelize, { type FindAttributeOptions } from "sequelize"
import type { BigPoints, IGraphFilter } from "../interfaces/graph"
import { DenunciaModel } from "../models"

export const getBigPoints = async (params: IGraphFilter): Promise<BigPoints[]> => {
  let groupBy = "cidade"
  let whereCidade: any = {}
  const attributes: FindAttributeOptions = ["cidade", [sequelize.fn("AVG", sequelize.col("pontuacao")), "pontuacao"]]

  if (params.cidade) {
    whereCidade = {
      cidade: params.cidade,
    }
    groupBy = "bairro"
    attributes.push("bairro")
  }

  const result = await DenunciaModel.findAll({
    attributes,
    where: whereCidade,
    order: [["pontuacao", "DESC"]],
    group: groupBy,
    limit: params?.limit || 10,
  })

  const bigPoints: BigPoints[] = result.map(item => item.get({ plain: true }));
  return bigPoints;
}

export const getCities = async () => {
  const result = await DenunciaModel.findAll({
    attributes: ['cidade'],
    group: 'cidade'
  })
  const cities = result.map(c => c.cidade)
  return cities
}
