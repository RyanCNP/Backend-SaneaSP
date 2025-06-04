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

export { UserLevel }
