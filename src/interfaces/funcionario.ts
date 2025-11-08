import { NivelFuncionario } from "../enums/NivelFuncionario.enum";

export interface IFuncionario {
    idFuncionario : number,
    idUsuario : number,
    idPrefeitura : number,
    cpf : string,
    telefone ?: string,
    nivel : NivelFuncionario
}

export type TFuncionarioPayload = Omit<IFuncionario, 'idFuncionario'>
export type TFuncionarioUpdate = Omit<IFuncionario, 'idFuncionario' | 'idUsuario' | 'idPrefeitura'>

export interface IFuncionarioFilter{
    nivel ?: IFuncionario['nivel'],
    idPrefeitura ?: IFuncionario['idPrefeitura']
}