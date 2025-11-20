import { Optional } from "sequelize"
import { StatusDenuncia } from "../enums/statusDenuncia.enum"

export enum TipoRegistro{
    Relatorio = 'relatorio',
    Agendamento = 'agendamento'
}

export interface IRegistro{
    id:number,
    dataPublicacao: Date,
    tipo: TipoRegistro,
    statusAnterior: StatusDenuncia
    statusPosterior: StatusDenuncia
    idUsuario: number,
    idDenuncia: number,
}

export type TRegistroAgendamentoPayload = Pick<
  IRegistro,
  'idUsuario' | 'idDenuncia'
> 

export type TRegistroRelatorioPayload = Pick<
  IRegistro,
  'idUsuario' | 'idDenuncia' | 'statusPosterior'
>

export type TRegistroCreate = Optional<IRegistro, 
    'id' 
    | 'dataPublicacao'>