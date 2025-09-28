import express, { Request, Response } from "express";
import { upload } from "../config/multer.config";
import { createImagemDenuncia, updateImagemDenuncia, deleteImagemDenuncia } from "../controllers/imagem-denuncia.controller";
import { validateToken } from "../middlewares/auth.middleware";

const router = express.Router();

router.post('/:id_denuncia', validateToken, upload.array("images", 5), async (req: Request, res: Response) => {
    const id_denuncia = Number(req.params.id_denuncia);
    const files = req.files as Express.Multer.File[];

    const fileNames = files.map(f => f.filename);
    const savedImages = await createImagemDenuncia(fileNames, id_denuncia);

    res.status(201).json(savedImages);
});

router.put('/:id_denuncia', validateToken, upload.array("images", 5), async (req: Request, res: Response) => {
    const id_denuncia = Number(req.params.id_denuncia);
    const files = req.files as Express.Multer.File[];
    const fileNames = files?.map(f => f.filename) || [];

    const updatedImages = await updateImagemDenuncia(fileNames, id_denuncia);
    res.status(200).json(updatedImages);
});

router.delete('/:id_denuncia', validateToken, async (req: Request, res: Response) => {
    const id_denuncia = Number(req.params.id_denuncia);
    await deleteImagemDenuncia(id_denuncia);

    res.status(200).json({ message: "Todas as imagens foram removidas." });
});

export default router;