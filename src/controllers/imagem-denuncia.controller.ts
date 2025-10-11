import * as imagemDenunciaService from "../services/imagem-denuncia.service"

export const createImagemDenuncia = async (fileNames: string[], id_denuncia: number) => {
  return await imagemDenunciaService.createImagemDenuncia(fileNames, id_denuncia)
}

// export const updateImagemDenuncia = async (fileNames: string[], id_denuncia: number) => {
//   return await imagemDenunciaService.updateImagemDenuncia(fileNames, id_denuncia)
// }

// export const deleteImagemDenuncia = async (id_denuncia: number) => {
//   return await imagemDenunciaService.deleteImagemDenuncia(id_denuncia)
// }
