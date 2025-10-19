import express from "express";
import {
  countAllCategorias,
  // createCategoria,
  // deleteCategoria,
  getCategoriaById,
  getCategoriaByName,
  getCategoriaList,
  getGruposCategorias,
  // updateCategoria,
} from "../controllers/categoria.controller";

const router = express.Router();

router.get("/", getCategoriaList);
router.get("/total", countAllCategorias);
router.get("/nome/:nome", getCategoriaByName);
router.get("/grupos", getGruposCategorias);
router.get("/:id", getCategoriaById);
//router.get("/grupos/:id", getCategoriaByName); A SER IMPLEMENTADO

/* NÃO SÃO MAIS UTILIZADOS */
// router.post("/", validateToken, createCategoria);
// router.put("/:id", validateToken, updateCategoria);
// router.delete("/:id", validateToken, deleteCategoria);

export default router;
