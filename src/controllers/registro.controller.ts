
import { Request, Response } from "express";
import {
    createRegistro,
    getAllRegistros,
    getRegistroById,
    updateRegistro,
    deleteRegistro,
} from "../services/registro.service";
import { ApiError } from "../errors/ApiError.error";
import { HttpCode } from "../enums/HttpCode.enum";

// Criar
export const createRegistroController = async (req: Request, res: Response) => {
    const { descricao, tipo, fkDenuncia, fkUsuario } = req.body;

    const registro = await createRegistro({
        descricao,
        dataPublicacao: new Date(),
        tipo,
        fkDenuncia,
        fkUsuario,
    });
    res.status(201).json(registro);
};

// Buscar todos
export const getAllRegistrosController = async (_req: Request, res: Response) => {
    const registros = await getAllRegistros();
    res.json(registros);
};

// Buscar por ID
export const getRegistroByIdController = async (req: Request, res: Response) => {
    const { id } = req.params;
    const registro = await getRegistroById(Number(id));

    if (!registro)
        throw new ApiError('Não foi possível encontrar o Registro',HttpCode.NotFound)

    res.json(registro);
};

// Atualizar
export const updateRegistroController = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updated = await updateRegistro(Number(id), req.body);

    if (!updated)
        throw new ApiError('Não foi possível encontrar o Registro',HttpCode.NotFound)

    res.json(updated);
};

// Deletar
export const deleteRegistroController = async (req: Request, res: Response) => {

    const { id } = req.params;
    const deleted = await deleteRegistro(Number(id));

    if (!deleted)
        throw new ApiError('Não foi possível encontrar o Registro',HttpCode.NotFound)

    res.status(204).send();

};
