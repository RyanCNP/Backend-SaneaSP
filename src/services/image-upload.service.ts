import fs from "fs/promises";
import path from "path";
import { config } from "dotenv";

config();

export const removeFile = async (fileNames: string[]) => {
  const uploadDir = path.resolve("public");

  await Promise.all(
    fileNames.map(file => {
      const filePath = path.join(uploadDir, file);

      return fs.unlink(filePath).catch(err => {
        console.error("Erro ao remover arquivo:", file, err);
      });
    })
  );
};