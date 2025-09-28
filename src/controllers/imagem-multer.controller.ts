import path from "path";
import fs from "fs";
import { uploadDir } from "../config/multer.config";

export const removeFiles = async (fileNames: string[]): Promise<void> => {
    for (const name of fileNames) {
        const filePath = path.join(uploadDir, name);

        if (fs.existsSync(filePath)) {
            await fs.promises.unlink(filePath);
        }
    }
};