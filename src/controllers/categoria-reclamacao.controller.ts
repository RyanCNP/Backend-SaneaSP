import { Op } from "sequelize";
import { ICreateCategoriaReclamacao } from "../interfaces/ICategoriaReclamacao.interface";
import { CategoriaModel, CategoriaReclamacaoModel } from "../models";

export const getCategoriaReclamacaoIdsList = async (reclamacaoId : number) => {
    const categorias = await CategoriaReclamacaoModel.findAll({where : {
        id_reclamacao : reclamacaoId
    }})

    return categorias.map(categoria => categoria.id_categoria)
}

export const postCategoriaReclamacoes = async (categorias : number[], reclamacaoId : number) => {
    const validCategoriasIds : number[] = await categoriaIdExistValidator(categorias)

    await CategoriaReclamacaoModel.bulkCreate(validCategoriasIds.map(id_categoria => ({
        id_categoria,
        id_reclamacao: reclamacaoId,
    })));
}

export const updateCategoriaReclamacoes = async (categorias : number[], reclamacaoId : number) => {
    // Remove categorias que estavam atreladas e não existem mais no array de ids passados
    const oldCategorias = await getCategoriaReclamacaoIdsList(reclamacaoId)

    const categoriasToRemove = oldCategorias.filter(oldCategoria => !categorias.includes(oldCategoria))

    await CategoriaReclamacaoModel.destroy({
        where : {
            id_categoria : {
                [Op.in] : categoriasToRemove
            },
            id_reclamacao : reclamacaoId
        }
    })

    //Categorias que já estão associadas e não foram removidas
    const existingCategoriasRelation = await CategoriaReclamacaoModel.findAll({
        where : {
            id_reclamacao : reclamacaoId,
            id_categoria : {
                [Op.in] : categorias
            }
        }
    })

    
    const existingCategoriasRelationIds = existingCategoriasRelation.map(categoria => categoria.id_categoria)

    //Categorias com ids que não foram inseridos ainda na relação
    const newCategorias = categorias.filter(categoriaId => {
        return !existingCategoriasRelationIds.includes(categoriaId)
    })

    const validNewCategoriasIds = await categoriaIdExistValidator(newCategorias)

    await CategoriaReclamacaoModel.bulkCreate(validNewCategoriasIds.map(categoriaId => ({
        id_categoria : categoriaId,
        id_reclamacao : reclamacaoId
    })));
}

export const deleteCategoriaReclamacoes = async (categoriaReclamacao : ICreateCategoriaReclamacao) => {
   await CategoriaReclamacaoModel.destroy({
        where : {
            id_reclamacao : categoriaReclamacao.id_reclamacao,
            id_categoria : categoriaReclamacao.id_categoria
        }
   })
}

export const categoriaIdExistValidator = async (categorias : number[]) => {
    //Verificando se as categorias existem na tabela de categorias
    const existingCategorias = await CategoriaModel.findAll({
        where : {
            id : {
                [Op.in] : categorias
            }
        }
    })

    const existingCategoriasIds = existingCategorias.map(categoria => categoria.id)

    if(existingCategorias.length != categorias.length){
        const invalidCategoriasIds = categorias.filter(categoriaId => {
            return !existingCategoriasIds.includes(categoriaId)
        })

        throw new Error((invalidCategoriasIds.length == 1 
            ? `A categoria com ID: ${invalidCategoriasIds} não existe` 
            : `As categorias com ID: ${invalidCategoriasIds.join(', ')} não existem`)
        )
    }

    return existingCategoriasIds;
}
