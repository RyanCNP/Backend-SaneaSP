import express, {Request, Response } from "express";
import { deleteImage, uploadImages } from "../config/multer.config";
import { validateToken } from "../middlewares/auth.middleware";
import { ApiError } from "../errors/ApiError.error";
import { HttpCode } from "../enums/HttpCode.enum";
const router = express.Router()

router.post('/', validateToken, uploadImages.array('imagens', 10) ,(req:Request,res:Response)=>{
    const files = req.files as Express.Multer.File[];
    let fileNames!:string[]
    if( files && files.length > 0){
        fileNames = files.map(file => file.filename);
    }
    res.json(fileNames)
});

router.post('/delete', validateToken, async (req:Request,res:Response)=>{
    const imagesNames:string[] = req.body;
    await deleteImage(imagesNames);
    res.send('Arquivos excluídos')
})

export default router;