import { ApiError } from '../errors/ApiError.error';
import { ComentarioModel } from '../models/comentario.model';
import { IComentario, IComentarioInput, ICreateComentario } from './../interfaces/comentario';
export const createComentario = async (mensage: IComentarioInput):Promise<IComentario>=>{
    const {usuario, denuncia} = mensage;

    const newComentario: ICreateComentario = {
        fkDenuncia: denuncia.id,
        fkUsuario: usuario.id,
        dataPublicacao: new Date(),
        descricao: mensage.descricao,
    };
    console.log(newComentario)
    const result = await ComentarioModel.create(newComentario);
    result.usuario = usuario;
    
    return result
}