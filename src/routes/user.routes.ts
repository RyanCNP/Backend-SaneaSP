import express from "express"
import { getUsers, getUserByName, getUserById, updateUser, deleteUser } from "../controllers/user.controller"

const router = express.Router()

router.get("/", getUsers)
router.get("/:id", getUserById)
router.get("/nome/:nome", getUserByName)
router.put("/:id", updateUser)
router.delete("/:id", deleteUser)

export default router
