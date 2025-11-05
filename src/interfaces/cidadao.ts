export interface ICidadao {
    idCidadao : number,
    idUsuario : number,
    cep ?: string,
    cidade ?: string,
    bairro ?: string,
    rua ?: string,
    numero ?: string,
    complemento ?: string,
    cpf ?: string,
    telefone ?: string
}

export type TCidadaoPayload = Omit<ICidadao, 'idCidadao'>;

export type TCidadaoUpdate = Omit<ICidadao, 'idCidadao' | 'idUsuario'>

export interface ICidadaoFilter{
    cidade ?: ICidadao['cidade']
    bairro ?: ICidadao['bairro']
}