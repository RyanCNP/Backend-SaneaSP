export interface ICategoriaDenuncia {
    id: number,
    id_categoria?: number,
    id_denuncia?: number
}

export interface ICreateCategoriaDenuncia {
    id_categoria: number,
    id_denuncia: number
}