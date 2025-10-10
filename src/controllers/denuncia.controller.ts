import type { Request, Response } from "express"
import type { ICreateDenuncia, IFilterListDenuncia } from "../interfaces/denuncia"
import {
  findAllDenuncias,
  findDenunciaById,
  findDenunciasByUsuario,
  findDenunciasByCategoria,
  createNewDenuncia,
  updateDenunciaById,
  deleteDenunciaById,
} from "../services/denuncia.service"
import { createImagemDenuncia, deleteImagemDenuncia, updateImagemDenuncia } from "./imagem-denuncia.controller"
import { createCategoryDenuncia, updateCategoryDenuncia } from "../services/categoria-denuncia.service"

export const getAllDenuncias = async (req: Request, res: Response) => {
  const query: IFilterListDenuncia = req.query
  const foundDenuncias = await findAllDenuncias(query)
  res.status(200).json(foundDenuncias)
}

export const getById = async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const denuncia = await findDenunciaById(id)
  res.status(200).json(denuncia)
}

export const getByUsuario = async (req: Request, res: Response) => {
  const idUsuario = req.user.id as number
  const denuncias = await findDenunciasByUsuario(idUsuario)
  res.status(200).json(denuncias)
}

export const getByCategoria = async (req: Request, res: Response) => {
  let listCategoriaId: number[] = []
  let listaQuery!: string[]
  let idUsuario: number | undefined

  if (!req.query.categorias) {
    res.status(400).json({
      error: true,
      message: `Nenhuma categoria foi informada`,
    })
    return
  }

  if (Array.isArray(req.query.categorias)) {
    listaQuery = req.query.categorias as string[]
    listCategoriaId = listaQuery.map((id) => Number(id))
  } else {
    listCategoriaId.push(Number(req.query.categorias as string))
  }

  if (req.query.idUsuario) {
    idUsuario = Number(req.query.idUsuario)
  }

  const denuncias = await findDenunciasByCategoria(listCategoriaId, idUsuario)
  res.json(denuncias)
}

export const postDenuncia = async (req: Request, res: Response) => {
  const body: ICreateDenuncia = req.body
  body.idUsuario = req.user.id as number
  const files = req.files as Express.Multer.File[]

  let denuncia = await createNewDenuncia(body)

  if (files && files.length > 0) {
    const fileNames = files.map((file) => file.filename)
    const createdImages = await createImagemDenuncia(fileNames, denuncia.id)

    if (createdImages.length > 0) {
      denuncia = await findDenunciaById(denuncia.id)
    }
  }

  if (body.categorias && body.categorias.length > 0) {
    await createCategoryDenuncia(body.categorias, denuncia.id)
    denuncia = await findDenunciaById(denuncia.id)
  }

  res.status(201).json(denuncia)
}

export const putDenuncia = async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const body = req.body
  const files = req.files as Express.Multer.File[]
  const fileNames = files?.map((file) => file.filename) || []

  await findDenunciaById(id)

  await updateDenunciaById(id, body)

  if (body.categorias) {
    await updateCategoryDenuncia(body.categorias, id)
  }

  if (fileNames.length > 0) {
    await updateImagemDenuncia(fileNames, id)
  }

  const updatedDenuncia = await findDenunciaById(id)
  res.status(200).json(updatedDenuncia)
}

export const deleteDenuncia = async (req: Request, res: Response) => {
  const idDenuncia = Number(req.params.id)

  const denuncia = await findDenunciaById(idDenuncia)

  await deleteImagemDenuncia(denuncia.id)
  await deleteDenunciaById(idDenuncia)

  res.status(200).json(denuncia)
}
