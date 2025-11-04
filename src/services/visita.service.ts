
import { Visita } from '../models/visita.model';
import { IVisita } from '../interfaces/visita';

import { ValidationError } from 'sequelize'; 

type VisitaReturnType = Visita | null;


export const criarVisita = async (dados: IVisita): Promise<Visita> => {
    try {
        
        const novaVisita = await Visita.create(dados as any);
        return novaVisita;
    } catch (error: any) {
        
        if (error instanceof ValidationError) {
            console.error('--- Erro de Validação do Sequelize ao criar Visita ---');
            error.errors.forEach(e => {
                
                console.error(`Campo: ${e.path}, Mensagem: ${e.message}, Tipo: ${e.type}`);
            });
            console.error('-------------------------------------------------------');
        }
        
        
        throw error;
    }
};


export const listarVisitas = async (): Promise<Visita[]> => {
    
    return Visita.findAll();
};


export const obterVisitaPorId = async (id: number): Promise<VisitaReturnType> => {
    
    return Visita.findByPk(id);
};


export const atualizarVisita = async (id: number, dados: Partial<IVisita>): Promise<VisitaReturnType> => {
    const [affectedCount] = await Visita.update(dados, {
        where: { id: id },
    });

    if (affectedCount === 0) {
        return null; 
    }

    
    const visitaAtualizada = await Visita.findByPk(id);
    return visitaAtualizada;
};


export const excluirVisita = async (id: number): Promise<void> => {
    const result = await Visita.destroy({
        where: { id: id },
    });

    if (result === 0) {
        throw new Error('Visita não encontrada para exclusão.');
    }
    
};