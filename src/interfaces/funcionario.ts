import { NivelFuncionario } from "../enums/NivelFuncionario.enum";

export interface IFuncionario {
    idFuncionario : number,
    idUsuario : number,
    //idPrefeitura : number,
    nivel : NivelFuncionario
}

export type TFuncionarioPayload = Omit<IFuncionario, 'idFuncionario'>
export type TFuncionarioUpdate = Omit<IFuncionario, 'idFuncionario' | 'idUsuario'>

export interface IFuncionarioFilter{
    nivel ?: IFuncionario['nivel']
}