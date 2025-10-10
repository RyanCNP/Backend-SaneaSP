import express from "express"
import {
  deleteDenuncia,
  getAllDenuncias,
  getById,
  getByUsuario,
  postDenuncia,
  putDenuncia,
  getByCategoria,
} from "../controllers/denuncia.controller"
import { validateToken } from "../middlewares/auth.middleware"
import { uploadImages } from "../config/multer.config"

const router = express.Router()

router.get("/", getAllDenuncias)
router.get("/categorias", getByCategoria)
router.get("/:id", getById)

router.use(validateToken)

router.get("/usuario", getByUsuario)
router.post("/", uploadImages.array("imagens", 10), postDenuncia)
router.put("/:id", uploadImages.array("imagens", 10), putDenuncia)
router.delete("/:id", deleteDenuncia)

export default router
