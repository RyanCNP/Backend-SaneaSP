import express from "express";
import {
  getAllRegistrosController,
  getRegistroByIdController,
  deleteRegistroController,
} from "../controllers/registro.controller";

const router = express.Router();

router.get("/", getAllRegistrosController);
router.get("/:id", getRegistroByIdController);
router.delete("/:id", deleteRegistroController);
// router.put("/:id", updateRegistroController);

export default router;
