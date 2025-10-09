import { Request, Response } from "express";
import { CategoriaModel } from "../models/categoria.model";
import { Op } from "sequelize";
import { ApiError } from "../errors/ApiError.error";
import { HttpCode } from "../enums/HttpCode.enum";

export const getCategoriaList = async (req: Request, res: Response) => {
  const categorias = await CategoriaModel.findAll();
  res.status(200).json(categorias);
};

export const countAllCategorias = async (req: Request, res: Response) => {
  const count = await CategoriaModel.count();
  res.status(200).json({ total: count });
};

export const getCategoriaById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const categoria = await CategoriaModel.findByPk(Number(id));

  if (!categoria)
    throw new ApiError("Nenhuma categoria encontrada", HttpCode.NotFound);

  res.status(200).json(categoria);
};

export const getCategoriaByName = async (req: Request, res: Response) => {
  const { nome } = req.params;
  const categoria = await CategoriaModel.findOne({
    where: { nome: { [Op.like]: `%${nome}%` } },
  });

  if (!categoria)
    throw new ApiError("Nenhuma categoria encontrada", HttpCode.NotFound);

  res.status(200).json(categoria);
};

export const createCategoria = async (req: Request, res: Response) => {
  const { nome } = req.body;
  const categoria = await CategoriaModel.findOne({
    where: { nome: { [Op.like]: `${nome}` } },
  });

  if (categoria)
    throw new ApiError("Esse nome já está em uso", HttpCode.Conflict);

  const created = await CategoriaModel.create({ nome });
  res.status(201).json({
    error: false,
    message: "Categoria criada com sucesso",
    categoria: created,
  });
};

export const updateCategoria = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nome } = req.body;

  const categoria = await CategoriaModel.findOne({ where: { id: Number(id) } });

  if (!categoria)
    throw new ApiError("Nenhuma categoria encontrada", HttpCode.NotFound);

  if (categoria.nome === nome)
    throw new ApiError(
      "Digite um novo nome para a categoria",
      HttpCode.BadRequest
    );

  const categoriaNameExists = await CategoriaModel.findOne({
    where: {
      nome: { [Op.like]: `%${nome}%` },
      id: { [Op.ne]: Number(id) },
    },
  });

  if (categoriaNameExists)
    throw new ApiError(
      "Uma categoria já foi cadastrada com esse nome",
      HttpCode.Conflict
    );

  await categoria.update({ nome });

  res.status(200).json({
    error: false,
    message: "Categoria atualizada com sucesso",
  });
};

export const deleteCategoria = async (req: Request, res: Response) => {
  const { id } = req.params;

  const categoriaFound = await CategoriaModel.findByPk(Number(id));

  if (!categoriaFound)
    throw new ApiError("Nenhuma categoria foi encontrada", HttpCode.NotFound);

  await categoriaFound.destroy();

  res.status(200).json({
    error: false,
    message: "Categoria excluída com sucesso",
  });
};
