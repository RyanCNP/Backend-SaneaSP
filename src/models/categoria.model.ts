import { DataTypes, Model, Optional } from "sequelize";
import sequelize from '../config/database'
import { ICategoria } from "../interfaces/categoria";

type CategoriaCreationalAttributes = Optional<ICategoria, "id">

export class CategoriaModel extends Model<ICategoria, CategoriaCreationalAttributes>{
    public id!: number;
    public nome!: string;
}

CategoriaModel.init(
{
    id : {
        primaryKey : true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        field: "id",
    },
    nome : {
        allowNull : false,
        type: DataTypes.STRING(50),
        field: "nome"
    },
}, 
{
    tableName: "categoria",
    sequelize,
    timestamps: false
})