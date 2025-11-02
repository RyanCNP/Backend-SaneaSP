import { Op } from "sequelize"
import { UserType } from "../enums/UserType.enum"
export interface IUser {
    id: number,
    nome: string,
    email: string,
    senha: string,
    tipo: UserType,
    verified: boolean
}

export interface IUserListFilters {
    nome?: IUser['nome'],
    email?: IUser['email'],
}