
import { Request, Response } from "express";
import {
    getAllRegistros,
    getRegistroById,
    deleteRegistro,
} from "../services/registro.service";
import { ApiError } from "../errors/ApiError.error";
import { HttpCode } from "../enums/HttpCode.enum";

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

// Deletar
export const deleteRegistroController = async (req: Request, res: Response) => {

    const { id } = req.params;
    const deleted = await deleteRegistro(Number(id));

    if (!deleted)
        throw new ApiError('Não foi possível encontrar o Registro',HttpCode.NotFound)

    res.status(204).send();

};
