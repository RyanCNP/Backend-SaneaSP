import { IDenuncia } from "./denuncia";
import { IUser } from "./usuario";

export interface IComentarioInput {
  descricao: string;
  usuario: IUser;
  denuncia: IDenuncia;
  fkDenuncia: number;
  fkUsuario: number;
  dataPublicacao: Date;
}
export interface ICreateComentario {
  descricao: string;
  dataPublicacao: Date;
  fkDenuncia: number;
  fkUsuario: number;
}
export interface IComentario {
  id: number;
  descricao: string;
  dataPublicacao: Date;
  fkDenuncia: number;
  fkUsuario: number;
  usuario?: IUser;
  denuncia?: IDenuncia;
}
