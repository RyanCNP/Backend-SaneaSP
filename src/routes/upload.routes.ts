import { Router } from "express";
import { uploadFile } from "../controllers/upload.controller";

const router = Router();

router.post("/", uploadFile);

export default router;

