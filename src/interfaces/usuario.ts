import { Op } from "sequelize"
import { UserType } from "../enums/UserType.enum"
export interface IUser {
    idUsuario: number,
    nome: string,
    email: string,
    senha: string,
    tipo: UserType,
    verified: boolean
}

export type IUserPayload = Omit<IUser, 'idUsuario' | 'verified'>;

export interface IUserListFilters {
    nome?: IUser['nome'],
    email?: IUser['email'],
}