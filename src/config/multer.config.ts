import multer from "multer";
import path from "path";
import fs from "fs";

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
    fileSize: 1024*1024*5,
};

export const uploadImages = multer({
    fileFilter,
    limits,
    storage
});