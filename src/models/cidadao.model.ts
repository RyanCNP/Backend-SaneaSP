import { Optional, Model, DataTypes } from "sequelize";
import sequelize from "../config/database.config";
import { ICidadao } from "../interfaces/cidadao";

export type ICriacaoCidadao = Optional<ICidadao, "idCidadao">;

export class CidadaoModel extends Model<ICidadao, ICriacaoCidadao> {
  public idCidadao!: number;
  public idUsuario!: number;
  public cep?: string;
  public cidade?: string;
  public bairro?: string;
  public rua?: string;
  public numero?: string;
  public complemento?: string;
  public cpf?: string;
  public telefone?: string;
}

CidadaoModel.init(
  {
    idCidadao: {
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
    cep: {
      allowNull: false,
      type: DataTypes.CHAR(8), //xxxxx-xxxx -> apenas números
      field: "cep",
    },
    cidade: {
      allowNull: false,
      type: DataTypes.STRING(50),
      field: "cidade",
    },
    bairro: {
      allowNull: false,
      type: DataTypes.STRING(50),
      field: "bairro",
    },
    rua: {
      allowNull: false,
      type: DataTypes.STRING(100),
      field: "rua",
    },
    numero: {
      allowNull: true,
      type: DataTypes.STRING(15),
      field: "numero",
    },
    complemento: {
      allowNull: true,
      type: DataTypes.STRING(50),
      field: "complemento",
    },
    cpf: {
      allowNull: true,
      type: DataTypes.CHAR(11), //xxx.xxx.xxx-xx -> apenas números
    },
    telefone: {
      allowNull: true,
      type: DataTypes.CHAR(11), //(xx)xxxxx-xxxx -> apenas números
    },
  },
  {
    tableName: "cidadao",
    sequelize,
    timestamps: false,
  }
);
