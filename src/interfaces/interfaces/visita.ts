export interface IVisita {
  id?: number;
  motivo: string;
  conclusao?: string;
  data_inicio: Date;
  data_final: Date;
  fk_registro: number;
}
