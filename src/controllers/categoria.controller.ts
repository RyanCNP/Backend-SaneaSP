import { ICategoria } from "../interfaces/ICategoria.interface";
import { ICategoriaListFilter } from "../interfaces/ICategoriaListFilter.interface";
import { CategoriaModel } from "../models/categoria.model";
import { FindOptions, Op } from "sequelize";
import { ApiError } from "../errors/ApiError.error";

export const getCategoriaList = async (categoriaFilter : ICategoriaListFilter) : Promise<ICategoria[]> => {
  const {nome, limit} = categoriaFilter;

  const where : any = {};

  if(nome){
    where.nome = {
      [Op.like]: `%${nome}%`
    };
  }

  const query : FindOptions = {
    where,
    order : [['id', 'ASC']]
  }

  if(limit){
    query.limit = Number(limit)
  }
  
  return await CategoriaModel.findAll(query);
}

export const countAllCategorias = async () : Promise<number> => await CategoriaModel.count();

export const getCategoriaById = async (categoriaId : number) => await CategoriaModel.findOne({where : {id : categoriaId}})

export const getCategoriaByName = async (nameFilter : string) => await CategoriaModel.findOne({where : {nome: nameFilter}})

export const createCategoria = async (newCategoriaName : string) : Promise<ICategoria> => {
  const categoria = await CategoriaModel.findOne({where : {nome : {[Op.like] : `${newCategoriaName}`}}})

  if(categoria){
    throw new ApiError(`Já existe uma categoria com o nome ${newCategoriaName}`, 409)
  }

  return await CategoriaModel.create({nome : newCategoriaName});
};

export const updateCategoria = async (updatedCategoria : ICategoria) : Promise<ICategoria> => {
  const categoria = await CategoriaModel.findOne({where : {id: updatedCategoria.id}})

  if(!categoria)
    throw new ApiError('Nenhuma categoria encontrada', 404)

  if(categoria.nome === updatedCategoria.nome)
    throw new ApiError('Digite um novo nome para a categoria', 400)

  const categoriaNameExists = await CategoriaModel.findOne({
    where: {
      nome : {[Op.like] : `%${updatedCategoria.nome}%`},
      id : {[Op.ne] : updatedCategoria.id}
    }
  })

  if(categoriaNameExists)
    throw new ApiError('Uma categoria já foi cadastrada com esse nome')

  return await categoria.update(updatedCategoria)
};

export const deleteCategoria = async (categoriaId : number) => {
  const categoriaFound = await CategoriaModel.findByPk(categoriaId)

  if(!categoriaFound)
    throw new ApiError('Nenhuma categoria foi encontrada', 404)

  await categoriaFound.destroy();
};
