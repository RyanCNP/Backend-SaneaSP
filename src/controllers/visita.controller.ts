// src/controllers/visita.controller.ts
import { Request, Response } from 'express';
// CORREÇÃO: Caminho correto sem a extensão '.ts'
import * as visitaService from '../services/visita.service'; 

/**
 * Cria uma nova visita
 */
export const criarVisita = async (req: Request, res: Response): Promise<void> => {
  try {
    const novaVisita = await visitaService.criarVisita(req.body);
    res.status(201).json(novaVisita);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Lista todas as visitas
 */
export const listarVisitas = async (req: Request, res: Response): Promise<void> => {
  try {
    const visitas = await visitaService.listarVisitas();
    res.json(visitas);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Obtém uma visita pelo ID
 */
export const obterVisitaPorId = async (req: Request, res: Response): Promise<void> => {
  try {
    const visita = await visitaService.obterVisitaPorId(req.params.id);
    
    // CORREÇÃO: Adicionado 'as any' para resolver o erro de tipagem no retorno (ts(2322))
    if (!visita) return res.status(404).json({ error: 'Visita não encontrada' }) as any;
    
    res.json(visita);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Atualiza uma visita
 */
export const atualizarVisita = async (req: Request, res: Response): Promise<void> => {
  try {
    const visita = await visitaService.atualizarVisita(req.params.id, req.body);
    
    // CORREÇÃO: Adicionado 'as any' para resolver o erro de tipagem no retorno (ts(2322))
    if (!visita) return res.status(404).json({ error: 'Visita não encontrada' }) as any;
    
    res.json(visita);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Exclui uma visita
 */
export const excluirVisita = async (req: Request, res: Response): Promise<void> => {
  try {
    await visitaService.excluirVisita(req.params.id);
    res.status(204).end(); 
  } catch (error: any) {
    // Se o service lançar erro de "Visita não encontrada", retorna 404
    if (error.message.includes('Visita não encontrada')) {
      return res.status(404).json({ error: error.message }) as any;
    }
    res.status(500).json({ error: error.message });
  }
};