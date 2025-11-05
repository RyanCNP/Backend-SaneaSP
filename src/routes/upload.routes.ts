import express from "express";
import { validateToken } from "../middlewares/auth.middleware";
import { deleteFiles, uploadFiles } from "../controllers/upload.controller";
import { uploadDenunciaImages } from "../config/multer.config";

const router = express.Router();

router.post(
  "/",
  validateToken,
  uploadDenunciaImages.array("imagens", 10),
  uploadFiles,
);

router.post("/delete", validateToken, deleteFiles);

export default router;
