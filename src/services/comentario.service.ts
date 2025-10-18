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
    const result = await ComentarioModel.create(newComentario);
    
    return result
}