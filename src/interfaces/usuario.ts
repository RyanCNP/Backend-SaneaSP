import { UserType } from "../enums/UserType.enum"
export interface IUser {
    idUsuario: number,
    nome: string,
    email: string,
    senha: string,
    tipo: UserType,
    verified: boolean
}

export type TUserPayload = Omit<IUser, 'idUsuario' | 'verified'>;

export type TSafeUser = Omit<IUser, 'senha'>;

export interface IUserListFilters {
    nome?: IUser['nome'],
    email?: IUser['email'],
}