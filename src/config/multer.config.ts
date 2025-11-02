
import { HttpCode } from './../enums/HttpCode.enum';
import multer from "multer";
import path from "path";
import fs, { existsSync } from "fs";
import { unlink } from 'fs/promises';
import { ApiError } from "../errors/ApiError.error";
import { UploadSubfolder } from '../enums/UploadSubFolder.enum';

export const uploadDir = path.join(__dirname, "../../public");

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

export function getMulterStorage(subfolder: UploadSubfolder) {
    const targetDir = path.join(uploadDir, subfolder);
    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
    }
    return multer.diskStorage({
        destination: (_req, _file, cb) => cb(null, targetDir),
        filename: (_req, file, cb) =>
            cb(null, Date.now() + "-" + file.originalname),
    });
}

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

export const uploadDenunciaImages = multer({
    storage: getMulterStorage(UploadSubfolder.Denuncias),
    fileFilter,
    limits,
});

export const uploadRegistroImages = multer({
    storage: getMulterStorage(UploadSubfolder.Registros),
    fileFilter,
    limits,
});

/**
 * Remove a single file, supporting subfolders for consistency.
 * @param imageName Name of the image file to remove.
 * @param subfolder Subfolder where the image is stored.
 */
export const removeFiles = async (imageNames: string[], subfolder: UploadSubfolder): Promise<void> => {
    const baseDir = subfolder ? path.join(uploadDir, subfolder) : uploadDir;

    await Promise.all(imageNames.map(async (imageName) => {
        const filePath = path.join(baseDir, imageName);
        if (!existsSync(filePath)) {
            throw new ApiError(`Não existe o arquivo ${imageName}`, HttpCode.BadRequest);
        }
        await unlink(filePath)
    }))
};