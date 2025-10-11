import express from "express";
import { validateToken } from "../middlewares/auth.middleware";
import {
  countAllCategorias,
  createCategoria,
  deleteCategoria,
  getCategoriaById,
  getCategoriaByName,
  getCategoriaList,
  updateCategoria,
} from "../controllers/categoria.controller";

const router = express.Router();

router.get("/", getCategoriaList);
router.use(validateToken);
router.get("/total", countAllCategorias);
router.get("/:id", getCategoriaById);
router.get("/nome/:nome", getCategoriaByName);
router.post("/", createCategoria);
router.put("/:id", updateCategoria);
router.delete("/:id", deleteCategoria);

export default router;
