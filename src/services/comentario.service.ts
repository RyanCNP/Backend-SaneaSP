import { DenunciaModel } from './../models/denuncia.model';
import { HttpCode } from './../enums/HttpCode.enum';
import { ApiError } from '../errors/ApiError.error';
import { ComentarioModel } from '../models/comentario.model';
import { IComentario, TComentarioCreate } from './../interfaces/comentario';
import { UserModel } from '../models/user.model';


export const createComentario = async (mensagem: TComentarioCreate): Promise<IComentario> => {
    const { idUsuario, idDenuncia, descricao } = mensagem;
    
    const newComentario: TComentarioCreate = {
        idDenuncia,
        idUsuario,
        descricao
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
                as: 'usuario', 
                attributes: {exclude : ['id', 'senha', 'email']}
            }
        ],
        attributes : {exclude : ['fk_usuario', 'fk_denuncia']}
    });
    if (!comentario) {
        throw new ApiError("Não foi possível encontrar Comentário com esse ID", HttpCode.NotFound);
    }
    return comentario
}

export const findAllComentariosByDenuncia = async (idDenuncia :number):Promise<IComentario[]> =>{
    const comentarios = await ComentarioModel.findAll({
        where: {
            idDenuncia: idDenuncia
        },
        order: [['dataPublicacao','ASC']],
        include: [
            {
                model: UserModel,
                as: 'usuario',
                attributes: {exclude : ['id', 'senha', 'email']}
            },
            {
                model: DenunciaModel,
                as: 'denuncia',
                attributes: ['idUsuario']
            }
        ],
        attributes : {exclude : ['fk_usuario', 'fk_denuncia']}
    })
    if(comentarios.length === 0){
        throw new ApiError('Não foi possivel encontrar nenhum comentario relacionado a essa denuncia',HttpCode.NotFound)
    }
    return comentarios
}

export const findAllComentarios = async (idUsuario?:number):Promise<IComentario[]> =>{
    let where = {};
    if(idUsuario){
        where = {idUsuario};
    }
    const comentarios = await ComentarioModel.findAll({
        where,
        order: ['dataPublicacao'],
        group:['idDenuncia'],
        include: [
            {
                model: UserModel,
                as: 'usuario',
                attributes: {exclude : ['id', 'senha', 'email']}
            },
            {
                model:DenunciaModel,
                as:'denuncia',
            }
        ],
        attributes : {exclude : ['fk_usuario', 'fk_denuncia']}
    })
    if(!comentarios){
        throw new ApiError('Não foi possivel encontrar nenhum comentario relacionado a essa denuncia',HttpCode.NotFound)
    }
    return comentarios
}