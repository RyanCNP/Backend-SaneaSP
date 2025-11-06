import express from "express"
import { getUsers, getUserById, getUserNameById, atualizaCidadao, removeCidadao } from "../controllers/user.controller"

const router = express.Router()

router.get("/", getUsers)
router.get("/:id", getUserById)
router.get("/:id/nome", getUserNameById)
router.put("/cidadao/:id", atualizaCidadao)
router.put("/funcionario/:id", atualizaCidadao)
router.put("/prefeitura/:id", atualizaCidadao)
router.delete("/cidadao/:id", removeCidadao)

export default router
