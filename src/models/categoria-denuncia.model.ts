import { DataTypes, Model, Optional } from "sequelize";
import sequelize from '../config/database.config'
import { ICategoriaDenuncia } from "../interfaces/categoria-denuncia";

type CategoriaDenunciaCreationalAttributes = Optional<ICategoriaDenuncia, "id">

export class CategoriaDenunciaModel extends Model<ICategoriaDenuncia, CategoriaDenunciaCreationalAttributes>{
    public id!: number;
    public id_categoria!: number;
    public id_denuncia!: number
}

CategoriaDenunciaModel.init({
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER,
        field: "id"
    },
    id_categoria: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: 'categoria',
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    id_denuncia: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: 'denuncia',
            key: 'id'
        },
        onDelete: 'CASCADE'
    }
},{
    tableName : 'categoria_denuncia',
    sequelize,
    timestamps : false
})