import { StatusDenuncia } from "../enums/statusDenuncia.enum";
import { IUser } from "./usuario";

export interface IDenuncia {
    id: number,
    titulo: string,
    descricao: string,
    dataPublicacao: Date,
    status: StatusDenuncia,
    pontuacao: number,
    cep: string,
    cidade: string,
    bairro: string,
    rua: string,
    numero?: string,
    complemento?: string,
    idUsuario: number
}

export interface IFilterListDenuncia {
    titulo?: string,
    descricao?: string,
    data?: Date,
    status?: StatusDenuncia,
    pontuacao?: number,
    cep?: string,
    cidade?: string,
    bairro?: string,
    rua?: string,
    numero?: string,
    complemento?: string
}

export interface ICreateDenuncia {
    titulo: string,
    descricao: string,
    pontuacao: number,
    cep: string,
    cidade: string,
    bairro: string,
    rua: string,
    numero?: string,
    complemento?: string,
    idUsuario: number,
    imagens?: string[],
    categorias?: number[]
}

export interface IDenunciaExcel{
    id: IDenuncia['id'],
    titulo : IDenuncia['titulo'],
    dataPublicacao : IDenuncia['dataPublicacao'],
    status: IDenuncia['status'],
    pontuacao: IDenuncia['pontuacao']
    author: IUser['nome']
}