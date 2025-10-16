import { Op } from "sequelize";
import { CategoriaModel, CategoriaDenunciaModel } from "../models";
import { ApiError } from "../errors/ApiError.error";
import { HttpCode } from "../enums/HttpCode.enum";

export const createCategoryDenuncia = async (categorias: number[], id_denuncia: number) => {
    await categoryIdExistsValidator(categorias)

    await CategoriaDenunciaModel.bulkCreate(categorias.map(id_categoria => ({
        id_categoria,
        id_denuncia,
    })));
}

export const updateCategoryDenuncia = async (updatedCategoriesIds: number[], id_denuncia: number) => {
    const oldCategories = await CategoriaDenunciaModel.findAll({ where: { id_denuncia } });
    const oldCategoryIds = oldCategories.map(category => category.id_categoria);

    /* Remove categorias que estavam atreladas e não existem mais no array de ids passados */
    const categoriesToRemove = oldCategoryIds.filter(category => !updatedCategoriesIds.includes(category))
    if (categoriesToRemove.length > 0) {
        await CategoriaDenunciaModel.destroy({
            where: {
                id_categoria: {
                    [Op.in]: categoriesToRemove
                },
                id_denuncia
            }
        })
    }

    /* Procura categorias que já estavam associadas e não foram removidas durante a atualização*/
    const categoriesToCreate = updatedCategoriesIds.filter(category => !oldCategoryIds.includes(category))
    /* Cria as novas categorias */
    if (categoriesToCreate.length > 0)
        await createCategoryDenuncia(categoriesToCreate, id_denuncia);
}

export const categoryIdExistsValidator = async (categories: number[]) => {
    //Verificando se as categorias existem na tabela de categorias, se não, lança uma exceção
    const existingCategories = await CategoriaModel.findAll({
        where: {
            id: {
                [Op.in]: categories
            }
        }
    })

    const existingCategoriesIds = existingCategories.map(category => category.id)

    if (existingCategories.length != categories.length) {
        const invalidCategoriesIds = categories.filter(categoryId => {
            return !existingCategoriesIds.includes(categoryId)
        })

        throw new ApiError((invalidCategoriesIds.length == 1
            ? `A categoria com ID: ${invalidCategoriesIds} não existe`
            : `As categorias com ID: ${invalidCategoriesIds.join(', ')} não existem`), HttpCode.NotFound)
    }

    return true;
}