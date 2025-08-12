import { NextFunction, Request, Response } from "express";
import express from "express";
import {
  countAllCategorias,
  createCategoria,
  deleteCategoria,
  getCategoriaById,
  getCategoriaByName,
  getCategoriaList,
  updateCategoria,
} from "../controllers/categoria.controller";
import { ICategoriaListFilter } from "../interfaces/categoria-list-filter";
import { ICategoria } from "../interfaces/categoria";
import { validateToken } from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    const filter : ICategoriaListFilter = req.query;
    const foundCategorias : ICategoria[] = await getCategoriaList(filter);

    res.status(200).json({
      data : foundCategorias,
      pagination : {
        limit : Number(filter.limit) || 0,
        total : foundCategorias.length
      }
    });
});

router.use(validateToken)

router.get("/total", async (req: Request, res: Response) => {
  const count = await countAllCategorias();
  res.status(200).json(count);
});

router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const categoria = await getCategoriaById(Number(id));

  res.status(200).json(categoria);
});

router.get("/nome/:nome", async (req: Request, res: Response) => {

  const { nome } = req.params;
  const categoria = await getCategoriaByName(nome);

  res.status(200).json({
    error: false,
    message: "Categoria encontrada com sucesso",
    data: categoria,
  });
});

router.post("/", async (req: Request, res: Response) => {
  const { nome } = req.body;

  const created = await createCategoria(nome);

  res.status(201).json({
    error: false,
    message : 'Categoria criada com sucesso',
    categoria : created
  });
});

router.put("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { nome } = req.body;

  await updateCategoria({ id, nome });

  res.status(200).json({
    error : false,
    message: 'Categoria atualizada com sucesso'
  });
});

router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  
  await deleteCategoria(Number(id));

  res.status(200).json({
    error : false,
    message : 'Categoria excluída com sucesso'
  });
});

export default router;
