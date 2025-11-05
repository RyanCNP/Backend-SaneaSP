import { StatusDenuncia } from "./../enums/statusDenuncia.enum";

export interface IfilterGraph {
  cidade?: string;
  status?: StatusDenuncia;
  pontuacao?: number;
  bairro?: string;
  limit?: number;
  dataInicio?: string;
  dataFinal?: string;
}
export interface BigPoints {
  cidade: string;
  bairro?: string;
  pontuacao: number;
}
