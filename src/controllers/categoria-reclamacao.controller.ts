import { Op } from "sequelize";
import { CategoriaModel, CategoriaReclamacaoModel } from "../models";
import { ApiError } from "../errors/ApiError.error";
import { HttpCode } from "../enums/HttpCode.enum";

export const createCategoryReclamacao = async (categorias : number[], id_reclamacao : number) => {
    await categoryIdExistsValidator(categorias)
    
    await CategoriaReclamacaoModel.bulkCreate(categorias.map(id_categoria => ({
        id_categoria,
        id_reclamacao,
    })));
}

export const updateCategoryReclamacao = async (updatedCategoriesIds : number[], id_reclamacao : number) => {
    const oldCategories = await CategoriaReclamacaoModel.findAll({where : {id_reclamacao}});
    const oldCategoryIds = oldCategories.map(categorie => categorie.id_categoria);

    /* Remove categorias que estavam atreladas e não existem mais no array de ids passados */
    const categoriesToRemove = oldCategoryIds.filter(categorie => !updatedCategoriesIds.includes(categorie))
    if(categoriesToRemove.length > 0){
        await CategoriaReclamacaoModel.destroy({
            where : {
                id_categoria : {
                    [Op.in] : categoriesToRemove
                },
                id_reclamacao
            }
        })
    }

    /* Procura categorias que já estavam associadas e não foram removidas durante a atualização*/
    const categoriesToCreate = updatedCategoriesIds.filter(categorie => !oldCategoryIds.includes(categorie))
    /* Cria as novas categorias */
    if(categoriesToCreate.length > 0)
        await createCategoryReclamacao(categoriesToCreate, id_reclamacao);
}

export const categoryIdExistsValidator = async (categories : number[]) => {
    //Verificando se as categorias existem na tabela de categorias, se não, lança uma exceção
    const existingCategories = await CategoriaModel.findAll({
        where : {
            id : {
                [Op.in] : categories
            }
        }
    })

    const existingCategoriesIds = existingCategories.map(category => category.id)

    if(existingCategories.length != categories.length){
        const invalidCategoriesIds = categories.filter(categoryId => {
            return !existingCategoriesIds.includes(categoryId)
        })

        throw new ApiError((invalidCategoriesIds.length == 1 
            ? `A categoria com ID: ${invalidCategoriesIds} não existe` 
            : `As categorias com ID: ${invalidCategoriesIds.join(', ')} não existem`), HttpCode.NotFound)
    }

    return true;
}