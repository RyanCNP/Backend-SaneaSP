import { Op } from "sequelize"
import { ImagemReclamacaoModel } from "../models"

export const createImagemReclamacao = async (imagesNames : string[], id_reclamacao : number) => {
    //TODO: Adicionar forma de criação de nome único para imagem (como concatenação com timestamp)
    const newImages = imagesNames.map(imageName => ({
        nome :imageName, 
        id_reclamacao
    }))

    await ImagemReclamacaoModel.bulkCreate(newImages)
}

export const updateImagemReclamacao = async(updatedImageNames : string[], id_reclamacao : number) => {
    const oldImages = await ImagemReclamacaoModel.findAll({where : {id_reclamacao}})
    const oldImageNames = oldImages.map(img => img.nome)

    //Verificando as imagens que já existiam
    const imagesToRemove = oldImageNames.filter(oldImage => !updatedImageNames.includes(oldImage))

    //Removendo todas imagens que não estão mais atreladas a reclamação
    if(imagesToRemove.length > 0){
        await ImagemReclamacaoModel.destroy(
        {
            where : 
            {
                nome : {[Op.in] : imagesToRemove},
                id_reclamacao
            }
        })
    }   

    //Criando os relacionamentos que não existiam antes
    const newImages = updatedImageNames.filter(imagem => !oldImageNames.includes(imagem))

    if(newImages.length > 0)await createImagemReclamacao(newImages, id_reclamacao)
}