import { NivelFuncionario } from "../enums/NivelFuncionario.enum";

export interface IFuncionario {
    idFuncionario : number,
    idUsuario : number,
    nivel : NivelFuncionario
}

export interface IFuncionarioFilter{
    nivel ?: IFuncionario['nivel']
}