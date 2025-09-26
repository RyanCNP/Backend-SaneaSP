import { Op } from "sequelize"
import { UserLevel } from "../enums/UserLevel.enum"


export interface IUser {
    id?: number,
    nome: string,
    telefone?: string,
    email: string,
    senha: string,
    cpf: string,
    cep ?: string,
    cidade ?: string,
    bairro ?: string,
    rua ?: string,
    numero ?: string,
    complemento ?: string,
    nivel: UserLevel,
    verified: boolean
}

export interface IUserListFilters {
    nome?: string,
    email?: string,
    cpf?: string
}

export interface IUserExists {
    where: {
        [Op.or]: Array<Partial<Record<keyof IUserListFilters, string>>>; //Array com as chaves
    }
}

export { UserLevel }