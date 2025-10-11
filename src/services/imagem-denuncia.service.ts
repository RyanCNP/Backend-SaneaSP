// import { uploadDir } from "../config/multer.config"
import type { ICreateImagemDenuncia, IImagemDenuncia } from "../interfaces/imagem-denuncia"
import { ImagemDenunciaModel } from "../models"
// import { Op } from "sequelize"
// import fs from "fs/promises"
// import path from "path"

export const getImagesByComplaintId = async (id : number) : Promise<IImagemDenuncia[]> => {
  return await ImagemDenunciaModel.findAll({where : {id_denuncia : id}})
}


export const createImagemDenuncia = async (fileNames: string[], id_denuncia: number) => {
  if (!fileNames || fileNames.length === 0) {
    throw new Error("Nenhum arquivo enviado.")
  }

  const newImages: ICreateImagemDenuncia[] = fileNames.map((nome) => ({ nome, id_denuncia }))
  await ImagemDenunciaModel.bulkCreate(newImages)

  return newImages
}

// export const updateImagemDenuncia = async (fileNames: string[], id_denuncia: number) => {
//   const oldImages = await ImagemDenunciaModel.findAll({ where: { id_denuncia } })
//   const oldImageNames = oldImages.map((img) => img.nome)

//   const filesToRemove = oldImageNames.filter((name) => !fileNames.includes(name))

//   if (filesToRemove.length > 0) {
//     await ImagemDenunciaModel.destroy({
//       where: {
//         nome: { [Op.in]: filesToRemove },
//         id_denuncia,
//       },
//     })
//   }

//   const newImages = fileNames.filter((name) => !oldImageNames.includes(name))

//   if (newImages.length > 0) {
//     await createImagemDenuncia(newImages, id_denuncia)
//   }

//   return await ImagemDenunciaModel.findAll({ where: { id_denuncia } })
// }

// export const deleteImagemDenuncia = async (id_denuncia: number) => {
//   const images = await ImagemDenunciaModel.findAll({ where: { id_denuncia } })
//   const imageNames = images.map((img) => img.nome)

//   for (const img of imageNames) {
//     const filePath = path.join(uploadDir, img)
//     await fs.unlink(filePath)
//   }

//   if (imageNames.length > 0) {
//     await ImagemDenunciaModel.destroy({ where: { id_denuncia } })
//   }
// }
