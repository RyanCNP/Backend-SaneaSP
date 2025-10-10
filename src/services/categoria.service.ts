import { CategoriaModel } from "../models/categoria.model"
import { Op } from "sequelize"
import { ApiError } from "../errors/ApiError.error"
import { HttpCode } from "../enums/HttpCode.enum"

export const findAllCategorias = async () => {
  return await CategoriaModel.findAll()
}

export const countCategorias = async () => {
  return await CategoriaModel.count()
}

export const findCategoriaById = async (id: number) => {
  const categoria = await CategoriaModel.findByPk(id)

  if (!categoria) throw new ApiError("Nenhuma categoria encontrada", HttpCode.NotFound)

  return categoria
}

export const findCategoriaByName = async (nome: string) => {
  const categoria = await CategoriaModel.findOne({
    where: { nome: { [Op.like]: `%${nome}%` } },
  })

  if (!categoria) throw new ApiError("Nenhuma categoria encontrada", HttpCode.NotFound)

  return categoria
}

export const createNewCategoria = async (nome: string) => {
  const categoria = await CategoriaModel.findOne({
    where: { nome: { [Op.like]: `${nome}` } },
  })

  if (categoria) throw new ApiError("Esse nome já está em uso", HttpCode.Conflict)

  return await CategoriaModel.create({ nome })
}

export const updateCategoriaById = async (id: number, nome: string) => {
  const categoria = await CategoriaModel.findOne({ where: { id } })

  if (!categoria) throw new ApiError("Nenhuma categoria encontrada", HttpCode.NotFound)

  if (categoria.nome === nome) throw new ApiError("Digite um novo nome para a categoria", HttpCode.BadRequest)

  const categoriaNameExists = await CategoriaModel.findOne({
    where: {
      nome: { [Op.like]: `%${nome}%` },
      id: { [Op.ne]: id },
    },
  })

  if (categoriaNameExists) throw new ApiError("Uma categoria já foi cadastrada com esse nome", HttpCode.Conflict)

  await categoria.update({ nome })
  return categoria
}

export const deleteCategoriaById = async (id: number) => {
  const categoriaFound = await CategoriaModel.findByPk(id)

  if (!categoriaFound) throw new ApiError("Nenhuma categoria foi encontrada", HttpCode.NotFound)

  await categoriaFound.destroy()
  return categoriaFound
}
