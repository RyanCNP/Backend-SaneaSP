import express from "express";
import {
  getUsers,
  getUserByName,
  getUserById,
  updateUser,
  deleteUser,
  getUserNameById,
} from "../controllers/user.controller";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.get("/:id/nome", getUserNameById);
router.get("/nome/:nome", getUserByName);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
