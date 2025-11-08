import { Optional, Model, DataTypes } from "sequelize";
import sequelize from "../config/database.config";
import { IPrefeitura } from "../interfaces/prefeitura";

export type ICriacaoPrefeitura = Optional<IPrefeitura, "id">;

export class PrefeituraModel extends Model<IPrefeitura, ICriacaoPrefeitura> {
  public id!: number;
  public nomeOficial!: string;
  public emailInstitucional!: string;
  public cnpj!: string;
  public codigoIbge!: string;
  public logo!: string;
  public descricao!: string;
  public cep!: string;
  public rua!: string;
  public bairro!: string;
  public cidade!: string;
  public numero!: string;
  public complemento?: string;
  public statusAssinatura!: string;
}

PrefeituraModel.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      field: "id",
    },
    nomeOficial: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: "nome_oficial",
    },
    emailInstitucional: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: "email_institucional",
      unique: true
    },
    cnpj: {
      type: DataTypes.STRING(14), //xx.xxx.xxx/xxxx-xx
      allowNull: false,
      field: "cnpj",
      unique: true
    },
    codigoIbge: {
      type: DataTypes.CHAR(7),
      allowNull: false,
      field: "codigo_ibge",
      unique: true
    },
    logo: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: "logo",
    },
    descricao: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: "descricao",
    },
    cep: {
      allowNull: true,
      type: DataTypes.CHAR(8), //xxxxx-xxxx -> apenas números
      field: "cep",
    },
    cidade: {
      allowNull: true,
      type: DataTypes.STRING(50),
      field: "cidade",
    },
    bairro: {
      allowNull: true,
      type: DataTypes.STRING(50),
      field: "bairro",
    },
    rua: {
      allowNull: true,
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
    statusAssinatura: {
      type: DataTypes.STRING(30),
      allowNull: false,
      field: "status_assinatura",
    },
  },
  {
    tableName: "prefeitura",
    sequelize,
    timestamps: false,
  }
);
