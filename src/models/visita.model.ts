// src/models/visita.model.ts

import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database.config';
// IMPORTANTE: Importar o Model de Registro para definir a associação
import { Registro } from './registro.model'; 

interface VisitaAttributes {
  id: number; // Assumido ser INTEGER
  motivo: string;
  conclusao?: string;
  data_inicio: Date;
  data_final: Date;
  //fk_registro: number;
}

interface VisitaCreationAttributes extends Optional<VisitaAttributes, 'id'> {}

export class Visita extends Model<VisitaAttributes, VisitaCreationAttributes>
  implements VisitaAttributes {
  public id!: number;
  public motivo!: string;
  public conclusao!: string;
  public data_inicio!: Date;
  public data_final!: Date;
  public fk_registro!: number;
  
  // CORREÇÃO: Mover a associação para DENTRO da classe como método estático
  // public static associate(models: any) {
  //   // Visita pertence a um Registro (relação N:1)
  //   Visita.belongsTo(models.Registro, { // Usamos models.Registro
  //       foreignKey: 'fk_registro', 
  //       as: 'registro' 
  //   });
  // }
}

Visita.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    motivo: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    conclusao: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    data_inicio: {
      type: DataTypes.DATE,
      allowNull: false
    },
    data_final: {
      type: DataTypes.DATE,
      allowNull: false
    },
    // fk_registro: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false
    // }
  },
  {
    sequelize,
    tableName: 'visitas',
    timestamps: false
  }
);

// REMOVA O BLOCO Visita.associate = () => { ... } que causava o erro