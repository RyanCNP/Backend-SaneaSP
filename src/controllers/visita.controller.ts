import { Request, Response } from 'express';
import * as visitaService from '../services/visita.service';


export const criarVisita = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log(req.body);
        
        if (!req.body.fk_registro) {
            res.status(400).json({ error: 'É necessário informar o fk_registro.' });
            return;
        }
        const novaVisita = await visitaService.criarVisita(req.body);
        res.status(201).json(novaVisita);
    } catch (error: any) {
        res.status(500).json({ error: 'Erro ao criar visita: ' + error.message });
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
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            res.status(400).json({ error: 'ID inválido.' });
            return;
        }
        const visita = await visitaService.obterVisitaPorId(id);

        if (!visita) {
            res.status(404).json({ error: 'Visita não encontrada' });
            return;
        }

        res.json(visita);
    } catch (error: any) {
        res.status(500).json({ error: 'Erro ao buscar visita: ' + error.message });
    }
};


export const atualizarVisita = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            res.status(400).json({ error: 'ID inválido.' });
            return;
        }
        const visita = await visitaService.atualizarVisita(id, req.body);

        if (!visita) {
            res.status(404).json({ error: 'Visita não encontrada para atualização' });
            return;
        }

        res.json(visita);
    } catch (error: any) {
        res.status(500).json({ error: 'Erro ao atualizar visita: ' + error.message });
    }
};

export const excluirVisita = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            res.status(400).json({ error: 'ID inválido.' });
            return;
        }
        
        await visitaService.excluirVisita(id);
        res.status(204).end();
    } catch (error: any) {
        if (error.message.includes('não encontrada')) {
            res.status(404).json({ error: error.message });
            return;
        }
        res.status(500).json({ error: 'Erro ao excluir visita: ' + error.message });
    }
};