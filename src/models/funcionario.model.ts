import { Optional, Model, DataTypes } from "sequelize";
import sequelize from "../config/database.config";
import { IFuncionario } from "../interfaces/funcionario";
import { NivelFuncionario } from "../enums/NivelFuncionario.enum";

export type ICriacaoFuncionario = Optional<IFuncionario, "idFuncionario">;

export class FuncionarioModel extends Model<IFuncionario, ICriacaoFuncionario> {
  public idfuncionario!: number;
  public idUsuario!: number;
  public nivel!: NivelFuncionario;
}

FuncionarioModel.init(
  {
    idFuncionario: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      field: "id",
    },
    idUsuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "id_usuario",
    },
    nivel: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "atendente",
    },
  },
  {
    tableName: "funcionario",
    sequelize,
    timestamps: false,
  }
);
