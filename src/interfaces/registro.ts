import { IDenuncia } from "./denuncia";
import { IUser } from "./usuario";

export enum TipoRegistro{
    Relatorio = 'relatorio',
    Agendamento = 'agendamento'
}

export interface IRegistro{
    id:number,
    descricao:string,
    dataPublicacao: Date,
    tipo: number,
    usuario?: IUser,
    denuncia?: IDenuncia,
    fkUsuario: number,
    fkDenuncia: number,
}

export interface ICreateRegistro{
    descricao:string,
    dataPublicacao: Date,
    tipo: number,
    arquivo ?: string[],
    fkUsuario: number,
    fkDenuncia: number,
}