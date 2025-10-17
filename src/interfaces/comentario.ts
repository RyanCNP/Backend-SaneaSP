import { IUser } from "./usuario";

export interface ComentarioInput{
  descricao:string,
  usuario: IUser
}
export interface ComentarioRead{
  id: number,
  descricao:string,
  data: Date,
  usuario: IUser
}

