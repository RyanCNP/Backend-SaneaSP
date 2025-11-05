import express from "express"
import { getUsers, getUserById, deleteUser, getUserNameById, atualizaCidadao } from "../controllers/user.controller"
import { userAlreadyExists } from "../middlewares/user-already-exists.middleware"


const router = express.Router()

router.get("/", getUsers)
router.get("/:id", getUserById)
router.get("/:id/nome", getUserNameById)
router.put("/cidadao/:id", atualizaCidadao)
router.put("/funcionario/:id", atualizaCidadao)
router.put("/prefeitura/:id", atualizaCidadao)
router.delete("/:id", deleteUser)

export default router
