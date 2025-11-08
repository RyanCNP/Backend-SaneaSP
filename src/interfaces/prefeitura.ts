export interface IPrefeitura  {
    id: number;
    nomeOficial: string; // enviado no primeiro formulário
    emailInstitucional: string; // enviado no primeiro formulário
    cnpj: string; // enviado no primeiro formulário
    codigoIbge: string;
    logo: string;
    descricao: string;
    cep: string;
    rua: string;
    bairro: string;
    cidade: string;
    numero: string;
    complemento?: string;
    statusAssinatura: string;
}

export type TPrefeituraUpdate = Omit<IPrefeitura, 'id' | 'codigoIbge'>

export type IPrefeituraPayload = Omit<IPrefeitura, 'id'>

export interface IPrefeituraFilter {
  nomeOficial?: string; 
  cidade?: IPrefeitura['cidade'];
  codigoIbge?: IPrefeitura['codigoIbge'];
  cnpj?: IPrefeitura['cnpj'];
  statusAssinatura?: IPrefeitura['statusAssinatura'];
}