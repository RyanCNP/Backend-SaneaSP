import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database.config";
import { IGrupoCategoria } from "../interfaces/grupo-categoria";

const IMAGE_BASE_URL = `${process.env.HOST}:${process.env.PORT}/public`;

type GrupoCategoriaCricao = Optional<IGrupoCategoria, "id">;

export class GrupoCategoriaModel extends Model<
  IGrupoCategoria,
  GrupoCategoriaCricao
> {
  public id!: number;
  public nome!: string;
  public icone!: string;

  public get url() {
    return `${IMAGE_BASE_URL}/grupos-categorias/${this.icone}`;
  }
}

GrupoCategoriaModel.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      field: "id",
    },
    nome: {
      allowNull: false,
      type: DataTypes.STRING(50),
      field: "nome",
    },
    icone: {
      allowNull: false,
      type: DataTypes.STRING(50),
      field: "icone",
    },
    url: {
      type: DataTypes.VIRTUAL,
      get(this: GrupoCategoriaModel) {
        return `${IMAGE_BASE_URL}/grupos-categorias/${this.getDataValue("icone")}`;
      },
    },
  },
  {
    tableName: "grupo_categoria",
    sequelize,
    timestamps: false,
  },
);
