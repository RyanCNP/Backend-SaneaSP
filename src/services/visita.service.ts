// src/services/visita.service.ts

import { Visita } from '../models/visita.model'; 
// Importa a interface para tipagem (Caminho lógico: services -> interfaces)
import { IVisita } from '../interfaces/interfaces/visita'; 

type VisitaReturnType = Visita | null;

/**
 * Cria uma nova visita no banco de dados.
 */
export const criarVisita = async (dados: IVisita): Promise<Visita> => {
  const novaVisita = await Visita.create(dados);
  console.log(novaVisita);
  return novaVisita;
};

/**
 * Lista todas as visitas.
 */
export const listarVisitas = async (): Promise<Visita[]> => {
  return Visita.findAll();
};

/**
 * Obtém uma visita por ID.
 */
export const obterVisitaPorId = async (id: string): Promise<VisitaReturnType> => {
  // Nota: Se o seu ID for INTEGER, mude o tipo de 'id' para number
  return Visita.findByPk(id); 
};

/**
 * Atualiza uma visita.
 */
export const atualizarVisita = async (id: string, dados: any): Promise<VisitaReturnType> => {
  const [affectedCount] = await Visita.update(dados, {
    where: { id: id },
  });

  if (affectedCount === 0) {
    return null;
  }
  
  const visitaAtualizada = await Visita.findByPk(id);
  return visitaAtualizada;
};

/**
 * Exclui uma visita.
 */
export const excluirVisita = async (id: string): Promise<void> => {
  const result = await Visita.destroy({
    where: { id: id },
  });

  if (result === 0) {
    throw new Error('Visita não encontrada para exclusão.');
  }
};