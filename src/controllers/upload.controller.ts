import { Request, Response } from "express";
import { removeFiles } from "../config/multer.config";
import { UploadSubfolder } from "../enums/UploadSubFolder.enum";

export const uploadFiles = (req: Request, res: Response) => {
  const files = req.files as Express.Multer.File[];
  let fileNames!: string[];
  if (files && files.length > 0) {
    fileNames = files.map((file) => file.filename);
  }
  res.json(fileNames);
};
export const deleteFiles = async (req: Request, res: Response) => {
  const imagesNames: string[] = req.body;
  await removeFiles(imagesNames, UploadSubfolder.Denuncias);
  res.send("Arquivos excluídos");
};
