export interface IVisita {
  id: number
  motivo: string
  dataInicio: Date
  dataFinal: Date
  idRegistro: number
}

export type TVisitaCreate = Omit<IVisita, 'id'>