import { DataTypes, Model, Optional } from "sequelize";
import sequelize from '../config/database'
import { IImagemDenuncia } from "../interfaces/imagem-denuncia";

type ImagemDenunciaCreationalAttributes = Optional<IImagemDenuncia, "id">

export class ImagemDenunciaModel extends Model<IImagemDenuncia, ImagemDenunciaCreationalAttributes>{
    public id!: number;
    public nome!: string;
    public id_denuncia!: number
}

ImagemDenunciaModel.init({
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER,
        field: "id"
    },
    nome: {
        allowNull: false,
        type: DataTypes.STRING(100),
        field: "nome"
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
    tableName : 'imagem_denuncia',
    sequelize,
    timestamps : false
})