import { IDenuncia } from "./denuncia";
import { IUser } from "./usuario";

export interface IRegistro{
    id:number,
    descricao:string,
    dataPublicacao: Date,
    tipo: number,
    arquivo ?: string,
    Usuario?: IUser,
    Denuncia?: IDenuncia,
    fkUsuario: number,
    fkDenuncia: number,
}

export interface ICreateRegistro{
    descricao:string,
    dataPublicacao: Date,
    tipo: number,
    arquivo ?: string,
    fkUsuario: number,
    fkDenuncia: number,
}