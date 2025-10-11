import express, {Request, Response } from "express";
import { validateToken } from "../middlewares/auth.middleware";
import { deleteFiles, uploadFiles } from "../controllers/upload.controller";
import { uploadImages } from "../config/multer.config";

const router = express.Router()

router.post('/', validateToken, uploadImages.array('imagens', 10), uploadFiles);

router.post('/delete', validateToken, deleteFiles)

export default router;