import { ITag } from "../interfaces/ITag.interface";
import { ITagListFilter } from "../interfaces/ITagListFilter.interface";
import { TagModel } from "../models/tag.model";
import { FindOptions, Op } from "sequelize";
import { ApiError } from "../errors/ApiError.error";

export const getTagList = async (tagFilter : ITagListFilter) : Promise<ITag[]> => {
  const where : any = {};

  if(tagFilter.nome){
    where.nome = {
      [Op.like]: `%${tagFilter.nome}%`
    };
  }

  const query : FindOptions = {
    where,
    order : [['id', 'ASC']]
  }

  if(tagFilter.limit){
    query.limit = Number(tagFilter.limit)
  }

  const tags = await TagModel.findAll(query)
  return tags;
}

export const countAllTags = async () : Promise<number> => {
  const tagCount = await TagModel.count();
  return tagCount;
}

export const getTagById = async (tagId : number) => {
  const tagFound = await TagModel.findOne({where : {id : tagId}})
  return tagFound;
};

export const getTagByName = async (nameFilter : string) => {
  const tagFound = await TagModel.findOne({where : {nome: nameFilter}})
  return tagFound;
}

export const createTag = async (newTagName : string) : Promise<ITag> => {
  const tagFound = await TagModel.findOne({where : {nome : {[Op.like] : `${newTagName}`}}})

  if(tagFound){
    throw new ApiError(`Já existe uma tag com o nome ${newTagName}`, 409)
  }

  const createdTag = await TagModel.create({nome : newTagName})

  return createdTag;
};

export const updateTag = async (tagData : ITag) : Promise<ITag> => {
  const tagFound = await TagModel.findOne({where : {id: tagData.id}})

  if(tagFound == null)
    throw new ApiError('Nenhuma categoria encontrada', 404)
  

  if(tagFound.nome === tagData.nome)
    throw new ApiError('Digite um novo nome para a categoria', 400)

  const tagNameExists = await TagModel.findOne({
    where: {
      nome : {[Op.like] : `%${tagData.nome}%`},
      id : {[Op.ne] : tagData.id}
    }
  })

  if(tagNameExists)
    throw new ApiError('Uma categoria já foi cadastrada com esse nome')

  const updatedTag = await tagFound.update(tagData)

  return updatedTag
};

export const deleteTag = async (tagId : number) => {
  const tagFound = await TagModel.findByPk(tagId)

  if(!tagFound)
    throw new ApiError('Nenhuma categoria foi encontrada', 404)

  await tagFound.destroy();
};
