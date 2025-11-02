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

export interface ICidadaoFilter{
    cidade ?: ICidadao['cidade']
    bairro ?: ICidadao['bairro']
}