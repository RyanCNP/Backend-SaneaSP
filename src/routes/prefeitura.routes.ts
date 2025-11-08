import express from "express"
import * as prefeituraController from '../controllers/prefeitura.controller'
import { validateToken } from "../middlewares/auth.middleware"
import { permissionMid } from "../middlewares/permission.middleware"
import { NivelFuncionario } from "../enums/NivelFuncionario.enum"

const router = express.Router()

router.get("/", prefeituraController.getCityHalls)
router.get("/:id", prefeituraController.getCityHallById)
router.put("/:id", validateToken, permissionMid(NivelFuncionario.ADMINISTRADOR),prefeituraController.updateCityHall)
router.delete("/:id",validateToken, permissionMid(NivelFuncionario.ADMINISTRADOR), prefeituraController.deleteCityHall)

export default router
