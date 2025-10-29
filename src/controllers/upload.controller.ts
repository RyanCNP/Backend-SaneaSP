import {Request, Response } from "express";
import { removeFile } from "../services/image-upload.service";

export const uploadFiles = (req:Request,res:Response)=>{
    const files = req.files as Express.Multer.File[];
    let fileNames!:string[]
    if( files && files.length > 0){
        fileNames = files.map(file => file.filename);
    }
    res.json(fileNames)
}
export const deleteFiles = async (req:Request,res:Response)=>{
    const imagesNames:string[] = req.body;
    await removeFile(imagesNames);
    res.send('Arquivos excluídos')
}