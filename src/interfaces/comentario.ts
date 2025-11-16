export interface IComentario{
  id : number,
  descricao:string,
  dataPublicacao: Date,
  idDenuncia : number,
  idUsuario : number,
}

export type TComentarioCreate = Pick<IComentario,'descricao' | 'idUsuario' | 'idDenuncia'>

