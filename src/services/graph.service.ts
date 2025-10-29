import sequelize, { type FindAttributeOptions } from "sequelize"
import type { BigPoints, IfilterGraph } from "../interfaces/graph"
import { DenunciaModel } from "../models"

export const getBigPoints = async (params: IfilterGraph): Promise<BigPoints[]> => {
  let groupBy = "cidade"
  let whereCidade: any = {}
  const selects: FindAttributeOptions = ["cidade", [sequelize.fn("SUM", sequelize.col("pontuacao")), "pontuacao"]]

  if (params.cidade) {
    whereCidade = {
      cidade: params.cidade,
    }
    groupBy = "bairro"
    selects.push("bairro")
  }

  const result = await DenunciaModel.findAll({
    attributes: selects,
    where: whereCidade,
    order: [["pontuacao", "DESC"]],
    group: groupBy,
    limit: params?.limit || 10,
  })

  return result as unknown as BigPoints[]
}
