import express, { Request, Response } from 'express';
import { uploadImages, uploadDir } from '../config/multer.config';
import { validateToken } from '../middlewares/auth.middleware';
import path from 'path';
import fs from 'fs';

const router = express.Router();


router.use(validateToken);

router.post('/imagens', uploadImages.array('imagens', 10), async (req: Request, res: Response) => {
    const files = req.files as Express.Multer.File[];
    const fileNames = files.map(file => file.filename);
    res.status(200).json({
        message: 'Imagens enviadas com sucesso',
        files: fileNames.map(file => path.join(uploadDir, file))
    });
})

router.get('/imagens', async (req: Request, res: Response) => {
    const files = await fs.readdirSync(uploadDir);
    res.status(200).json({
        files: files.map(file => path.join(uploadDir, file))
    })
})
/*
router.get('/imagens/:filename', async (req: Request, res: Response) => {
    const { filename } = req.params;
    const filePath = path.join(uploadDir, filename);
    res.status(200).json(filename).sendFile(filePath);
})

router.put('/imagens/atualizar-imagens', async (req: Request, res: Response) => {
    const files = req.files as Express.Multer.File[];
    const fileNames = files.map(file => file.filename);
    res.status(200).json(fileNames);
})

router.delete('/imagens/remover-todos', async (req: Request, res: Response) => {
    const files = await uploadDir;
    fs.unlinkSync(files);
    res.status(200).json({message: `As imagens ${files} foram removidas com sucesso!`});
})

router.delete('/imagens/remover/:filename', async (req: Request, res: Response) => {
    const { filename } = req.params;
    const filePath = path.join(uploadDir, filename);
    fs.unlinkSync(filePath);
    res.status(200).json({message: `A imagem ${filename} foi removida com sucesso!`});
})
*/
export default router;