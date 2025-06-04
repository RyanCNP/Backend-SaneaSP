import { Op } from "sequelize"
import { UserLevel } from "../enums/UserLevel.enum"
import { IEndereco } from "./IEndereco.interface"

export interface IUser {
    id: number,
    nome: string,
    telefone?: string,
    email: string,
    senha: string,
    cpf: string,
    endereco?: IEndereco,
    nivel: UserLevel
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
