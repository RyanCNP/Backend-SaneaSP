import { NivelFuncionario } from "../enums/NivelFuncionario.enum";
import { IUser, IUserListFilters } from "./usuario";

export interface IFuncionario extends IUser {
    funcionarioId : number,
    nivel : NivelFuncionario
}

export interface IFuncionarioFilter extends IUserListFilters{
    nivel ?: IFuncionario['nivel']
}