import express from "express"
import { getUsers, getUserById, getUserNameById, atualizaCidadao, atualizaFuncionario, deleteUser } from "../controllers/user.controller"
import { validateToken } from "../middlewares/auth.middleware"

const router = express.Router()

router.get("/", getUsers)
router.get("/:id", getUserById)
router.get("/:id/nome", getUserNameById)
router.put("/cidadao", validateToken, atualizaCidadao)
router.put("/funcionario", validateToken, atualizaFuncionario)
router.put("/prefeitura", validateToken,  atualizaFuncionario)
router.delete("/:id",validateToken, deleteUser)

export default router
