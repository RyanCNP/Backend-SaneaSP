import { Optional, Model, DataTypes } from "sequelize";
import sequelize from "../config/database.config";
import { IFuncionario } from "../interfaces/funcionario";
import { NivelFuncionario } from "../enums/NivelFuncionario.enum";

export type ICriacaoFuncionario = Optional<IFuncionario, "idFuncionario">;
export class FuncionarioModel extends Model<IFuncionario, ICriacaoFuncionario> {
  public idFuncionario!: number;
  public idUsuario!: number;
  public cpf !: string;
  public telefone !: string;
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
    idPrefeitura: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "id_prefeitura",
    },
    cpf: {
      type: DataTypes.STRING(11), //xxx.xxx.xxx-xx
      allowNull: false,
    },
    telefone: {
      type: DataTypes.STRING(11), //(xx)xxxxx-xxxx
      allowNull: true,
    },
    nivel: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
  },
  {
    tableName: "funcionario",
    sequelize,
    timestamps: false,
  }
);
