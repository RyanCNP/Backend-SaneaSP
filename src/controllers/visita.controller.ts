import { Request, Response } from 'express';
import * as visitaService from '../services/visita.service';
import { TVisitaCreate } from '../interfaces/visita';
import { TransactionNotProvided } from '../errors/TransactionNotProvided.error';
import { HttpCode } from '../enums/HttpCode.enum';
import { ApiError } from '../errors/ApiError.error';


export const criarVisita = async (req: Request, res: Response): Promise<void> => {
    const transaction = req.transaction;
    if(!transaction) throw new TransactionNotProvided('Ocorreu um problema ao criar o seu usuário')
    try{
        const idRegistro = req.newRegisterId
        const { motivo, dataFinal, dataInicio } = req.body as TVisitaCreate
        const newVisit : TVisitaCreate = {
            motivo, dataFinal, dataInicio, idRegistro
        }
        const novaVisita = await visitaService.criarVisita(newVisit, transaction);
        await transaction.commit()
        res.status(201).json(novaVisita); 
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

export const listarVisitas = async (req: Request, res: Response): Promise<void> => {
    try {
        const visitas = await visitaService.listarVisitas();
        res.json(visitas);
    } catch (error: any) {
        res.status(500).json({ error: 'Erro ao listar visitas: ' + error.message });
    }
};


export const obterVisitaPorId = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params

    const visita = await visitaService.obterVisitaPorId(id);

    if (!visita) {
        throw new ApiError('Nenhuma visita encontrada', HttpCode.NotFound)
    }

    res.json(visita);
};


export const atualizarVisita = async (req: Request, res: Response): Promise<void> => {
  
};

export const excluirVisita = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params
    
    await visitaService.excluirVisita(id);
    res.status(204).end();
};