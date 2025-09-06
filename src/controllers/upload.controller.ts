import { Request, Response } from "express";
import multer, { MulterError } from "multer";
import path from "path";
import fs from "fs";

// Configuração do multer para salvar os arquivos na pasta public
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, path.join(__dirname, "../../public"));
  },
  filename: (_req, _file, cb) => {
    cb(null, `${Date.now()}.jpg`);
  },
});

const upload = multer({ storage }).single("file");

// POST /upload → Faz upload de uma imagem
export const uploadFile = (req: Request, res: Response): void => {
  upload(req, res, (err: any) => {
    if (err instanceof MulterError || err) {
      return res.status(500).send({ error: err.message || "Erro no upload." });
    }

    const file = (req as any).file;

    if (!file || !file.filename) {
      return res.status(400).send({ message: "Nenhum arquivo enviado." });
    }

    console.log("Arquivo recebido:", file.filename);
    res.status(200).send({
      message: "Upload realizado com sucesso",
      imageUrl: `/public/${file.filename}`,
    });
  });
};

// GET /upload → Lista arquivos da pasta public
export const getUploadedFiles = (_req: Request, res: Response): void => {
  const dirPath = path.join(__dirname, "../../public");

  fs.readdir(dirPath, (err, files) => {
    if (err) {
      return res
        .status(500)
        .send({ error: "Erro ao ler a pasta de imagens." });
    }

    const fileUrls = files.map((file) => `/public/${file}`);
    res.status(200).send({ files: fileUrls });
  });
};
