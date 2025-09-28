import express, { Request, Response } from 'express';
import { uploadImages, uploadDir } from '../config/multer.config';
import { validateToken } from '../middlewares/auth.middleware';

const router = express.Router();


router.use(validateToken);

router.post('/imagens', uploadImages.array('imagens', 10), async (req: Request, res: Response) => {
    const files = req.files as Express.Multer.File[];
    const fileNames = files.map(file => file.filename);
    res.status(200).json(fileNames);
})

router.get('/imagens', async (req: Request, res: Response) => {
    const files = await uploadDir;
    res.status(200).json(files);
})

router.get('/imagens/:filename', async (req: Request, res: Response) => {
    const { filename } = req.params;
    res.status(200).json(filename);
})

router.put('/imagens/:filename', async (req: Request, res: Response) => {
    const { filename } = req.params;
    res.status(200).json(filename);
})

router.put('/imagens/atualizar-imagens', async (req: Request, res: Response) => {
    const files = await uploadDir;
    res.status(200).json(files);
})

router.delete('/imagens/remover-todos', async (req: Request, res: Response) => {
    const files = await uploadDir;
    res.status(200).json(files);
})

router.delete('/imagens/remover/:filename', async (req: Request, res: Response) => {
    const { filename } = req.params;
    res.status(200).json(filename);
})

export default router;