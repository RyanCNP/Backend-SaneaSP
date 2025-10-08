import express, {Request, Response } from "express";
import { uploadImages } from "../config/multer.config";
const router = express.Router()

router.post('/', uploadImages.array('imagens', 10),(req:Request,res:Response)=>{
    const files = req.files as Express.Multer.File[];
    let fileNames!:string[]
    if( files && files.length > 0){
        fileNames = files.map(file => file.filename);
    }
    res.json(fileNames)
})

export default router;