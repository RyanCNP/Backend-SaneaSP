import { Op } from "sequelize"
import { ImagemDenunciaModel } from "../models"

export const createImagemDenuncia = async (imagesNames : string[], id_denuncia : number) => {
    //TODO: Adicionar forma de criação de nome único para imagem (como concatenação com timestamp)
    const newImages = imagesNames.map(imageName => ({
        nome :imageName, 
        id_denuncia
    }))

    await ImagemDenunciaModel.bulkCreate(newImages)
}

export const updateImagemDenuncia = async(updatedImageNames : string[], id_denuncia : number) => {
    const oldImages = await ImagemDenunciaModel.findAll({where : {id_denuncia}})
    const oldImageNames = oldImages.map(img => img.nome)

    //Verificando as imagens que já existiam
    const imagesToRemove = oldImageNames.filter(oldImage => !updatedImageNames.includes(oldImage))

    //Removendo todas imagens que não estão mais atreladas a reclamação
    if(imagesToRemove.length > 0){
        await ImagemDenunciaModel.destroy(
        {
            where : 
            {
                nome : {[Op.in] : imagesToRemove},
                id_denuncia
            }
        })
    }   

    //Criando os relacionamentos que não existiam antes
    const newImages = updatedImageNames.filter(imagem => !oldImageNames.includes(imagem))

    if(newImages.length > 0)await createImagemDenuncia(newImages, id_denuncia)
}