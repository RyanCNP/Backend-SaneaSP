import { Optional, Model, DataTypes } from "sequelize";
import sequelize from '../config/database.config'
import { ICategoria } from "../interfaces/categoria";

type CategoriaCreationalAttributes = Optional<ICategoria, "id">;

export class CategoriaModel extends Model<
  ICategoria,
  CategoriaCreationalAttributes
> {
  public id!: number;
  public nome!: string;
}

CategoriaModel.init(
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
    id_grupo:{
        allowNull: false,
        type: DataTypes.INTEGER,
        field: "id_grupo"
    }
  },
  {
    tableName: "categoria",
    sequelize,
    timestamps: false,
  }
);
