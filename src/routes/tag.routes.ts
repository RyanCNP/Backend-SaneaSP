import { NextFunction, Request, Response } from "express";
import express from "express";
import {
  countAllTags,
  createTag,
  deleteTag,
  getTagById,
  getTagByName,
  getTagList,
  updateTag,
} from "../controllers/tag.controller";
import { ITagListFilter } from "../interfaces/ITagListFilter.interface";
import { ITag } from "../interfaces/ITag.interface";
import { validateToken } from "../middlewares/auth.middleware"
import { ApiError } from "../errors/ApiError.error";

const router = express.Router();

router.use(validateToken)

router.get("/", async (req: Request, res: Response, next : NextFunction) => {
  try {
    const tagFilter : ITagListFilter = req.query;
    const foundTags : ITag[] = await getTagList(tagFilter);

    res.status(200).json({
      data : foundTags,
      pagination : {
        limit : Number(tagFilter.limit) || 0,
        total : foundTags.length
      }
    });
  } catch (error) {
    next(error)
  }
});

router.get("/total", async (req: Request, res: Response, next : NextFunction) => {
  try {
    const count = await countAllTags();
    res.status(200).json(count);
  } catch (error) {
    next(error)
  }
});

router.get("/:id", async (req: Request, res: Response, next : NextFunction) => {
  try {
    const { id } = req.params;

    const tagFound = await getTagById(Number(id));

    if (!tagFound) {
      throw new ApiError('Nenhuma categoria foi encontrada com esse ID', 404)
    }

    res.status(200).json(tagFound);
  } catch (error) {
   next(error)
  }
});

router.get("/nome/:nome", async (req: Request, res: Response, next : NextFunction) => {
  try {
    const { nome } = req.params;
    const tagFound = await getTagByName(nome);

    if (!tagFound) {
      throw new ApiError('Nenhuma categoria foi encontrada com esse nome', 404)
    }

    res.status(200).json({
      error: false,
      message: "Categoria encontrada com sucesso",
      data: tagFound,
    });
  } catch (error) {
    next(error)
  }
});

router.post("/", async (req: Request, res: Response, next : NextFunction) => {
  try {
    const { nome } = req.body;

    const result = await createTag(nome);

    res.status(201).json({
      error: false,
      message : 'Categoria criada com sucesso',
      categoria : result
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req: Request, res: Response, next : NextFunction) => {
  try {
    const id = Number(req.params.id);
    const { nome } = req.body;

    const result = await updateTag({ id, nome });

    res.status(200).json(result);
  } catch (error) {
    next(error)
  }
});

router.delete("/:id", async (req: Request, res: Response, next : NextFunction) => {
  try {
    const { id } = req.params;
    
    await deleteTag(Number(id));

    res.status(200).json({
      error : false,
      message : 'Categoria excluída com sucesso'
    });
  } catch (error) {
    next(error)
  }
});

export default router;
