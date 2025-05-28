import { UserLevel } from "../enums/UserLevel.enum"

export interface IUser {
    id: number,
    nome: string,
    telefone?: string,
    email: string,
    senha: string,
    cpf: string,
    cep?: string,
    cidade?: string,
    bairro?: string,
    rua?: string,
    numero?: number,
    complemento?: string
    nivel: UserLevel
}

export interface IUserListFilters {
    nome?: string,
    email?: string,
    cpf?: string
}