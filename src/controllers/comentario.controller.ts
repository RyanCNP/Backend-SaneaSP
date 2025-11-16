import { findAllComentarios, findAllComentariosByDenuncia } from '../services/comentario.service';
import { IComentario } from './../interfaces/comentario';
import { Request, Response } from "express";

export const getAllComentario = async (req:Request,res:Response)=>{
    const id: number = Number(req.params.id);
    const comentarios: IComentario[] = await findAllComentariosByDenuncia(id);
    res.status(200).json(comentarios);
}