import { HttpCode } from './../enums/HttpCode.enum';
import multer from "multer";
import path from "path";
import fs, { existsSync } from "fs";
import { unlink } from 'fs/promises'; // Importe 'unlink' do 'fs/promises'
import { ApiError } from "../errors/ApiError.error";

export const uploadDir = path.join(__dirname, "../../public");

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadDir),
    filename: (_req, file, cb) =>
        cb(null, Date.now() + "-" + file.originalname),
});

const fileFilter: multer.Options["fileFilter"] = (_req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Apenas imagens são permitidas!"));
    }
};

const limits = {
    fieldNameSize: 150,
    fileSize: 1024 * 1024 * 5,
};

export const uploadImages = multer({
    fileFilter,
    limits,
    storage
});

export const deleteImage =  async(imagesName: string[]):Promise<void>=>{
    if(imagesName.length > 0){
        for (let img of imagesName) {
            const filePath = path.join(uploadDir, img);
            if(!existsSync(filePath)){
                throw new ApiError(`Não existe o arquivo ${img}`,HttpCode.BadRequest)
            }
            await unlink(filePath)
        }
    }
}