import express from "express"
import { getUsers, getUserById, getUserNameById, atualizaCidadao, removeCidadao, atualizaFuncionario, removeFuncionario } from "../controllers/user.controller"
import { validateToken } from "../middlewares/auth.middleware"

const router = express.Router()

router.get("/", getUsers)
router.get("/:id", getUserById)
router.get("/:id/nome", getUserNameById)
router.put("/cidadao/:id", validateToken, atualizaCidadao)
router.put("/funcionario/:id", validateToken, atualizaFuncionario)
router.put("/prefeitura/:id", validateToken,  atualizaFuncionario)
router.delete("/cidadao/:id",validateToken, removeCidadao)
router.delete("/funcionario/:id", validateToken, removeFuncionario)

export default router
