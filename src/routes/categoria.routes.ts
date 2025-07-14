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
import { ICategoriaListFilter } from "../interfaces/ICategoriaListFilter.interface";
import { ICategoria } from "../interfaces/ICategoria.interface";
import { validateToken } from "../middlewares/auth.middleware"
import { ApiError } from "../errors/ApiError.error";

const router = express.Router();

router.get("/", async (req: Request, res: Response, next : NextFunction) => {
  try {
    const filter : ICategoriaListFilter = req.query;
    const foundCategorias : ICategoria[] = await getCategoriaList(filter);

    res.status(200).json({
      data : foundCategorias,
      pagination : {
        limit : Number(filter.limit) || 0,
        total : foundCategorias.length
      }
    });
  } catch (error) {
    next(error)
  }
});

router.use(validateToken)

router.get("/total", async (req: Request, res: Response, next : NextFunction) => {
  try {
    const count = await countAllCategorias();
    res.status(200).json(count);
  } catch (error) {
    next(error)
  }
});

router.get("/:id", async (req: Request, res: Response, next : NextFunction) => {
  try {
    const { id } = req.params;

    const categoria = await getCategoriaById(Number(id));

    if (!categoria) {
      throw new ApiError('Nenhuma categoria foi encontrada com esse ID', 404)
    }

    res.status(200).json(categoria);
  } catch (error) {
   next(error)
  }
});

router.get("/nome/:nome", async (req: Request, res: Response, next : NextFunction) => {
  try {
    const { nome } = req.params;
    const categoria = await getCategoriaByName(nome);

    if (!categoria) {
      throw new ApiError('Nenhuma categoria foi encontrada com esse nome', 404)
    }

    res.status(200).json({
      error: false,
      message: "Categoria encontrada com sucesso",
      data: categoria,
    });
  } catch (error) {
    next(error)
  }
});

router.post("/", async (req: Request, res: Response, next : NextFunction) => {
  try {
    const { nome } = req.body;

    const created = await createCategoria(nome);

    res.status(201).json({
      error: false,
      message : 'Categoria criada com sucesso',
      categoria : created
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req: Request, res: Response, next : NextFunction) => {
  try {
    const id = Number(req.params.id);
    const { nome } = req.body;

    await updateCategoria({ id, nome });

    res.status(200).json({
      error : false,
      message: 'Categoria atualizada com sucesso'
    });
  } catch (error) {
    next(error)
  }
});

router.delete("/:id", async (req: Request, res: Response, next : NextFunction) => {
  try {
    const { id } = req.params;
    
    await deleteCategoria(Number(id));

    res.status(200).json({
      error : false,
      message : 'Categoria excluída com sucesso'
    });
  } catch (error) {
    next(error)
  }
});

export default router;
