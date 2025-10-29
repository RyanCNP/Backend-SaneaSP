import express from "express";
import {
  createRegistroController,
  getAllRegistrosController,
  getRegistroByIdController,
  updateRegistroController,
  deleteRegistroController,
} from "../controllers/registro.controller";

const router = express.Router();

router.post("/", createRegistroController);
router.get("/", getAllRegistrosController);
router.get("/:id", getRegistroByIdController);
router.put("/:id", updateRegistroController);
router.delete("/:id", deleteRegistroController);

export default router;
