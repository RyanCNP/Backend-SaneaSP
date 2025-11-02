import { NivelFuncionario } from "../enums/NivelFuncionario.enum";
import { IUser, IUserListFilters } from "./usuario";

export interface IFuncionario extends IUser {
    idFuncionario : number,
    nivel : NivelFuncionario
}

export interface IFuncionarioFilter extends IUserListFilters{
    nivel ?: IFuncionario['nivel']
}