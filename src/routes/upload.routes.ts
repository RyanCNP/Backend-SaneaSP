import { Router } from "express";
import { uploadFile, getUploadedFiles } from "../controllers/upload.controller";

const router = Router();

router.post("/", uploadFile);        // POST /upload
router.get("/", getUploadedFiles);   // GET /upload

export default router;
