import { UserType } from "../enums/UserType.enum"
export interface IUser {
    id: number,
    nome: string,
    email: string,
    senha: string,
    tipo: UserType,
    verified: boolean
}

export type TUserPayload = Omit<IUser, 'id' | 'verified'>;

export type TSafeUser = Omit<IUser, 'senha'>;

export type TSafePassword = Pick<IUser, 'idUsuario' | 'senha'>;

export interface IUserListFilters {
    nome?: IUser['nome'],
    email?: IUser['email'],
}