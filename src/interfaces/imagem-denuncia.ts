export interface IImagemDenuncia {
    id : number;
    nome: string;
    id_denuncia: number;
    url : string
}

export interface ICreateImagemDenuncia {
    nome: string;
    id_denuncia: number;
}
