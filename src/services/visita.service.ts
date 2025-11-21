
import { VisitaModel } from '../models/visita.model';
import { IVisita, TVisitaCreate } from '../interfaces/visita';
import { ApiError } from '../errors/ApiError.error';
import { HttpCode } from '../enums/HttpCode.enum';
import { Transaction } from 'sequelize';
import { RegistroModel } from '../models';

const where = { 
    attributes: { exclude: ['id_registro'] },
    include: [
        {
            model: RegistroModel,
            as: 'registro',
            attributes: { exclude: ['id', 'id_usuario', 'id_denuncia'] }
        }
    ]
};

export const criarVisita = async (newVisit: TVisitaCreate, transaction : Transaction): Promise<VisitaModel> => {
    const novaVisita = await VisitaModel.create(newVisit, {transaction});
    return novaVisita;
}

export const listarVisitas = async (): Promise<VisitaModel[]> => {
    return VisitaModel.findAll(where);
};
export const obterVisitaPorId = async (id: string): Promise<IVisita | null> => {
    return VisitaModel.findByPk(id, where);
};

export const atualizarVisita = async (id: number, dados: Partial<IVisita>) => {
   
};


export const excluirVisita = async (id: string): Promise<void> => {
    const result = await VisitaModel.destroy({
        where: { id },
    });

    if (result === 0) {
        throw new ApiError('Visita não encontrada para exclusão.', HttpCode.NotFound);
    }
};