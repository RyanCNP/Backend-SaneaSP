import { IEndereco } from './IEndereco.interface';
import { StatusReclamacao } from "../enums/statusReclamacao.enum";

export interface IReclamacao{
    id : number,
    titulo: string,
    descricao: string,
    data: Date,
    status: StatusReclamacao,
    pontuacao: number,
    cep ?: string,
    cidade ?: string,
    bairro ?: string,
    rua ?: string,
    numero ?: string,
    complemento ?: string,
    objUsuario: number,
    objImagem ?: string[],
    objTag ?: string[],
}