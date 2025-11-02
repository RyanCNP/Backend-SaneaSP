import { IUser, IUserListFilters } from "./usuario";

export interface ICidadao extends IUser {
    cidadaoId : number,
    cep ?: string,
    cidade ?: string,
    bairro ?: string,
    rua ?: string,
    numero ?: string,
    complemento ?: string,
    cpf ?: string,
    telefone ?: string
}

export interface ICidadaoFilter extends IUserListFilters{
    cidade ?: ICidadao['cidade']
    bairro ?: ICidadao['bairro']
}