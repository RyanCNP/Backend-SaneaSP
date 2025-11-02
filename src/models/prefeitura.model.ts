import { Optional, Model, DataTypes } from "sequelize";
import sequelize from "../config/database.config";
import { IPrefeitura } from "../interfaces/prefeitura";

export type ICriacaoPrefeitura = Optional<IPrefeitura, 'idPrefeitura'>;

export class PrefeituraModel extends Model<IPrefeitura, ICriacaoPrefeitura> {
  public idPrefeitura!: number;
  public idUsuario!: number;
  public cidade!: string;
  public cnpj!: string;
}

PrefeituraModel.init({
  idPrefeitura: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    field: 'id'
  },
  idUsuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'id_usuario'
  },
  cidade: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  cnpj: {
    type: DataTypes.STRING(14),
    allowNull: false
  }
}, {
  tableName: 'prefeitura', 
  sequelize,
  timestamps: false
});