export interface IPrefeitura  {
    idPrefeitura : number,
    idUsuario : number,
    cidade : string,
    cnpj : string
}

export interface IPrefeituraFilter{
    cidade ?: IPrefeitura['cidade']
}