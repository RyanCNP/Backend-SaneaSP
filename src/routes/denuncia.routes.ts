import express from "express"
import {
  deleteDenuncia,
  getAllDenuncias,
  getById,
  getUserComplaint,
  postDenuncia,
  putDenuncia,
  getByCategoria,
  exportExcel,
} from "../controllers/denuncia.controller"
import { validateToken } from "../middlewares/auth.middleware"
import { uploadImages } from "../config/multer.config"

const router = express.Router()

router.get("/", getAllDenuncias)
router.get("/categorias", getByCategoria)
router.get("/my", validateToken, getUserComplaint)
router.get("/export", exportExcel);
router.get("/:id", getById)
router.post("/", validateToken ,uploadImages.array("imagens", 10), postDenuncia)
router.get("/usuario", getUserComplaint)
router.post("/", validateToken, postDenuncia)
router.put("/:id", validateToken, uploadImages.array("imagens", 10), putDenuncia)
router.delete("/:id", validateToken, deleteDenuncia)

export default router
