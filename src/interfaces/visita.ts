

export interface IVisita {
  
  id: number;
  createdAt: Date; 
  updatedAt: Date; 

  
  motivo: string;
  conclusao: string;
  data_inicio: Date; 
  data_final: Date;   

  
  fk_registro: number; 

  
}


export interface ICreateVisita {
  motivo: string;
  conclusao: string;
  data_inicio: Date | string;
  data_final: Date | string;
  fk_registro: number;
}