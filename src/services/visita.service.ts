
import { VisitaModel } from '../models/visita.model';
import { IVisita } from '../interfaces/visita';

import { ValidationError } from 'sequelize'; 

type VisitaReturnType = VisitaModel | null;


export const criarVisita = async (dados: IVisita): Promise<VisitaModel> => {
    try {
        
        const novaVisita = await VisitaModel.create(dados as any);
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


export const listarVisitas = async (): Promise<VisitaModel[]> => {
    
    return VisitaModel.findAll();
};


export const obterVisitaPorId = async (id: number): Promise<VisitaReturnType> => {
    
    return VisitaModel.findByPk(id);
};


export const atualizarVisita = async (id: number, dados: Partial<IVisita>): Promise<VisitaReturnType> => {
    const [affectedCount] = await VisitaModel.update(dados, {
        where: { id: id },
    });

    if (affectedCount === 0) {
        return null; 
    }

    
    const visitaAtualizada = await VisitaModel.findByPk(id);
    return visitaAtualizada;
};


export const excluirVisita = async (id: number): Promise<void> => {
    const result = await VisitaModel.destroy({
        where: { id: id },
    });

    if (result === 0) {
        throw new Error('Visita não encontrada para exclusão.');
    }
    
};