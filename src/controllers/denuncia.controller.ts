import type { Request, Response } from "express"
import type { ICreateDenuncia, IDenuncia, IFilterListDenuncia } from "../interfaces/denuncia"
import {
  findAllDenuncias,
  findDenunciaById,
  findUserComplaint,
  findDenunciasByCategoria,
  createNewDenuncia,
  updateDenunciaById,
  deleteDenunciaById,
  exportDenunciasExcel,
} from "../services/denuncia.service"
import { createImagemDenuncia } from "./imagem-denuncia.controller"
import { createCategoryDenuncia, updateCategoryDenuncia } from "../services/categoria-denuncia.service"
import { getImagesByComplaintId } from "../services/imagem-denuncia.service"
import { removeFiles } from "../config/multer.config"
import { UploadSubfolder } from "../enums/UploadSubFolder.enum"
import { findDenunciaFeedbackById, deleteDenunciaFeedback } from "../services/feedback.service"
import logger from "../../logger-winston"


export const getAllDenuncias = async (req: Request, res: Response) => {
  const query: IFilterListDenuncia = req.query
  const foundDenuncias = await findAllDenuncias(query)
  res.status(200).json(foundDenuncias)
}

export const getById = async (req: Request, res: Response) => {
  logger.info('GetDenunciasById',{rota:`denuncias/:id`})
  const id = Number(req.params.id)
  const denuncia = await findDenunciaById(id)
  res.status(200).json(denuncia)
}

export const getUserComplaint = async (req: Request, res: Response) => {
  const idUsuario = req.user.id as number
  const filter: IFilterListDenuncia = req.query
  const denuncias = await findUserComplaint(idUsuario, filter)
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
  logger.info('postDenuncias',{rota:'denuncias/'})
  const body: ICreateDenuncia = req.body;
  body.idUsuario = req.user.id as number;
  let denuncia = await createNewDenuncia(body)

  if (body.imagens && body.imagens.length > 0) {
    const createdImages = await createImagemDenuncia(body.imagens, denuncia.id)

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
  logger.info('putDenuncias',{rota:'denuncias/'})
  const id = Number(req.params.id);
  const body = req.body as ICreateDenuncia;

  await findDenunciaById(id);

  await updateDenunciaById(id, body);

  if (body.categorias) {
    await updateCategoryDenuncia(body.categorias, id);
  }

  if (body.imagens && body.imagens.length > 0) {
    let files: string[] = body.imagens;
    const images = await getImagesByComplaintId(id)
    await removeFiles(images.map(img => img.nome), UploadSubfolder.Denuncias);
    await createImagemDenuncia(files, id)
  }

  const updatedDenuncia = await findDenunciaById(id)
  res.status(200).json(updatedDenuncia)
}

export const deleteDenuncia = async (req: Request, res: Response) => {
  logger.info('deleteDenuncias',{rota:'denuncias/'})
  const idDenuncia = Number(req.params.id)

  const denuncia = await findDenunciaById(idDenuncia)
  const imagens = await getImagesByComplaintId(idDenuncia);
  const feedback = await findDenunciaFeedbackById(idDenuncia);
  await removeFiles(imagens.map(img => img.nome), UploadSubfolder.Denuncias);
  await deleteDenunciaById(idDenuncia)
  await deleteDenunciaFeedback(feedback.id)

  res.status(200).json(denuncia)
}

export const exportExcel = async (req: Request, res: Response) => {
  try {
    logger.info('ExcelDenuncias',{rota:'denuncias/'})
    const buffer = await exportDenunciasExcel(); // chama a função do controller

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=denuncias.xlsx");
    res.send(buffer);
  } catch (err) {
    logger.error("Erro ao gerar planilha",{err})
    console.error(err);
    res.status(500).json({ error: "Erro ao gerar planilha Excel" });
  }
}