import express from "express";
import {
  countAllCategorias,
  // createCategoria,
  // deleteCategoria,
  getCategoriaById,
  getCategoriaByName,
  getCategoriaList,
  // updateCategoria,
} from "../controllers/categoria.controller";

const router = express.Router();

router.get("/", getCategoriaList);
router.get("/total", countAllCategorias);
router.get("/:id", getCategoriaById);
router.get("/nome/:nome", getCategoriaByName);

/* NÃO SÃO MAIS UTILIZADOS */
// router.post("/", validateToken, createCategoria);
// router.put("/:id", validateToken, updateCategoria);
// router.delete("/:id", validateToken, deleteCategoria);

export default router;
