import { DataTypes, Model, Optional } from "sequelize";
import sequelize from '../config/database.config'
import { IGrupoCategoria } from "../interfaces/grupo-categoria";

type GrupoCategoriaCricao = Optional<IGrupoCategoria, "id">

export class GrupoCategoriaModel extends Model<IGrupoCategoria, GrupoCategoriaCricao> {
    public id!: number;
    public nome!: string;
    public icone!: string
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
            field: "nome"
        },
        icone: {
            allowNull: false,
            type: DataTypes.STRING(50),
            field: 'icone'
        }
    },
    {
        tableName: "grupo_categoria",
        sequelize,
        timestamps: false
    })