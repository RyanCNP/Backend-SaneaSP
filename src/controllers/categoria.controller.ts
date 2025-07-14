import { ICategoria } from "../interfaces/ICategoria.interface";
import { ICategoriaListFilter } from "../interfaces/ICategoriaListFilter.interface";
import { CategoriaModel } from "../models/categoria.model";
import { FindOptions, Op } from "sequelize";
import { ApiError } from "../errors/ApiError.error";

export const getCategoriaList = async (categoriaFilter : ICategoriaListFilter) : Promise<ICategoria[]> => {
  const where : any = {};

  if(categoriaFilter.nome){
    where.nome = {
      [Op.like]: `%${categoriaFilter.nome}%`
    };
  }

  const query : FindOptions = {
    where,
    order : [['id', 'ASC']]
  }

  if(categoriaFilter.limit){
    query.limit = Number(categoriaFilter.limit)
  }

  const categorias = await CategoriaModel.findAll(query)
  return categorias;
}

export const countAllCategorias = async () : Promise<number> => {
  const categoriaCount = await CategoriaModel.count();
  return categoriaCount;
}

export const getCategoriaById = async (categoriaId : number) => {
  const categoriaFound = await CategoriaModel.findOne({where : {id : categoriaId}})
  return categoriaFound;
};

export const getCategoriaByName = async (nameFilter : string) => {
  const categoriaFound = await CategoriaModel.findOne({where : {nome: nameFilter}})
  return categoriaFound;
}

export const createCategoria = async (newcategoriaName : string) : Promise<ICategoria> => {
  const categoriaFound = await CategoriaModel.findOne({where : {nome : {[Op.like] : `${newcategoriaName}`}}})

  if(categoriaFound){
    throw new ApiError(`Já existe uma categoria com o nome ${newcategoriaName}`, 409)
  }

  const createdCategoria = await CategoriaModel.create({nome : newcategoriaName})

  return createdCategoria;
};

export const updateCategoria = async (categoriaData : ICategoria) : Promise<ICategoria> => {
  const categoriaFound = await CategoriaModel.findOne({where : {id: categoriaData.id}})

  if(categoriaFound == null)
    throw new ApiError('Nenhuma categoria encontrada', 404)
  

  if(categoriaFound.nome === categoriaData.nome)
    throw new ApiError('Digite um novo nome para a categoria', 400)

  const categoriaNameExists = await CategoriaModel.findOne({
    where: {
      nome : {[Op.like] : `%${categoriaData.nome}%`},
      id : {[Op.ne] : categoriaData.id}
    }
  })

  if(categoriaNameExists)
    throw new ApiError('Uma categoria já foi cadastrada com esse nome')

  const updatedCategoria = await categoriaFound.update(categoriaData)

  return updatedCategoria
};

export const deleteCategoria = async (categoriaId : number) => {
  const categoriaFound = await CategoriaModel.findByPk(categoriaId)

  if(!categoriaFound)
    throw new ApiError('Nenhuma categoria foi encontrada', 404)

  await categoriaFound.destroy();
};
