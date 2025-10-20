import { DenunciaModel } from './../models/denuncia.model';
import { HttpCode } from './../enums/HttpCode.enum';
import { ApiError } from '../errors/ApiError.error';
import { ComentarioModel } from '../models/comentario.model';
import { IComentario, IComentarioInput, ICreateComentario } from './../interfaces/comentario';
import { UserModel } from '../models/user.model';


export const createComentario = async (mensage: IComentarioInput): Promise<IComentario> => {
    const { usuario, denuncia } = mensage;
    
    const newComentario: ICreateComentario = {
        fkDenuncia: denuncia.id,
        fkUsuario: usuario.id,
        dataPublicacao: new Date(),
        descricao: mensage.descricao,
    };
    const result = await ComentarioModel.create(newComentario);

    const fullComentario = await findComentarioById(result.id);
    return fullComentario
}
export const findComentarioById = async (idComentario: number): Promise<IComentario> => {
    const comentario: IComentario | null = await ComentarioModel.findByPk(idComentario, {
        include: [
            {
                model: UserModel,
                as: 'usuario', // use o alias correto da sua associação
            }
        ]
    });
    if (!comentario) {
        throw new ApiError("Não foi possível encontrar Comentário com esse ID", HttpCode.NotFound);
    }
    return comentario
}

export const findAllComententariosByDenuncia = async (id:number):Promise<IComentario[]> =>{
    const comentarios = await ComentarioModel.findAll({
        where: {
            fkDenuncia: id
        },
        order: [['dataPublicacao','DESC']],
        include: [
            {
                model: UserModel,
                as: 'usuario'
            },
        ]
    })
    if(!comentarios){
        throw new ApiError('Não foi possivel encontrar nenhum comentario relacionado a essa denuncia',HttpCode.NotFound)
    }
    return comentarios
}

export const findAllComententarios = async (id?:number):Promise<IComentario[]> =>{
    let where = {};
    if(id){
        where = {fkUsuario:id};
    }
    const comentarios = await ComentarioModel.findAll({
        where: where,
        order: ['dataPublicacao'],
        group:['fkDenuncia'],
        include: [
            {
                model: UserModel,
                as: 'usuario'
            },
            {
                model:DenunciaModel,
                as:'denuncia',
            }
        ]
    })
    if(!comentarios){
        throw new ApiError('Não foi possivel encontrar nenhum comentario relacionado a essa denuncia',HttpCode.NotFound)
    }
    return comentarios
}