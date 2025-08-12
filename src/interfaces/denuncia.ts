import { StatusDenuncia } from "../enums/statusDenuncia.enum";

export interface IDenuncia{
    id : number,
    titulo: string,
    descricao: string,
    data: Date,
    status: StatusDenuncia,
    pontuacao: number,
    cep ?: string,
    cidade ?: string,
    bairro ?: string,
    rua ?: string,
    numero ?: string,
    complemento ?: string,
    idUsuario: number,
    Imagens ?: string[] //Nomes das imagens,
    Categorias ?: number[] //Ids das tags,
}

export interface IFilterListDenuncia{
    titulo ?: string,
    descricao ?: string,
    data ?: Date,
    status ?: StatusDenuncia,
    pontuacao? : number,
    cep ?: string,
    cidade ?: string,
    bairro ?: string,
    rua ?: string,
    numero ?: string,
    complemento ?: string
}

export interface ICreateDenuncia{
    titulo: string,
    descricao: string,
    cep ?: string,
    cidade ?: string,
    bairro ?: string,
    rua ?: string,
    numero ?: string,
    complemento ?: string,
    idUsuario: number,
    Imagens ?: string[],
    Categorias ?: number[]
}