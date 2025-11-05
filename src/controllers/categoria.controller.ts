import type { Request, Response } from "express";
import {
  findAllCategorias,
  countCategorias,
  findCategoriaById,
  findCategoriaByName,
  findAllGrupoCategorias,
  // createNewCategoria,
  // updateCategoriaById,
  // deleteCategoriaById,
} from "../services/categoria.service";

export const getCategoriaList = async (req: Request, res: Response) => {
  const categorias = await findAllCategorias();
  res.status(200).json(categorias);
};

export const countAllCategorias = async (req: Request, res: Response) => {
  const count = await countCategorias();
  res.status(200).json({ total: count });
};

export const getCategoriaById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const categoria = await findCategoriaById(Number(id));
  res.status(200).json(categoria);
};

export const getCategoriaByName = async (req: Request, res: Response) => {
  const { nome } = req.params;
  const categoria = await findCategoriaByName(nome);
  res.status(200).json(categoria);
};

export const getGruposCategorias = async (req: Request, res: Response) => {
  const categorias = await findAllGrupoCategorias();
  res.status(200).json(categorias);
};

/* NÃO SÃO MAIS UTILIZADOS  */
// export const createCategoria = async (req: Request, res: Response) => {
//   const { nome } = req.body
//   const created = await createNewCategoria(nome)
//   res.status(201).json({
//     error: false,
//     message: "Categoria criada com sucesso",
//     categoria: created,
//   })
// }

// export const updateCategoria = async (req: Request, res: Response) => {
//   const { id } = req.params
//   const { nome } = req.body
//   await updateCategoriaById(Number(id), nome)
//   res.status(200).json({
//     error: false,
//     message: "Categoria atualizada com sucesso",
//   })
// }

// export const deleteCategoria = async (req: Request, res: Response) => {
//   const { id } = req.params
//   await deleteCategoriaById(Number(id))
//   res.status(200).json({
//     error: false,
//     message: "Categoria excluída com sucesso",
//   })
// }
