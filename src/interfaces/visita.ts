export interface IVisita {
  id: number;
  data_inicio: Date; 
  data_final: Date;   
  fk_registro: number; 
}

export interface ICreateVisita {
  data_inicio: Date | string;
  data_final: Date | string;
  fk_registro: number;
}