import { DataTypes, Model, Optional } from "sequelize";
import sequelize from '../config/database.config'
import { IImagemRegistro } from "../interfaces/imagem-registro";


type ImagemRegistroCreationalAttributes = Optional<IImagemRegistro, "id">;
export class ImagemRegistroModel extends Model<IImagemRegistro, ImagemRegistroCreationalAttributes> {
    public id!: number;
    public nome!: string;
    public id_registro!: number
}

ImagemRegistroModel.init({
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
    id_registro: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: 'registro',
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
}, {
    tableName: 'imagem_registro',
    sequelize,
    timestamps: false
})