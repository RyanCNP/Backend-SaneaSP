import { IUser, IUserListFilters } from "./usuario";

export interface IPrefeitura extends IUser {
    prefeituraId : number,
    cidade : string,
    cnpj : string
}

export interface IPrefeituraFilter extends IUserListFilters{
    cidade ?: IPrefeitura['cidade']
}