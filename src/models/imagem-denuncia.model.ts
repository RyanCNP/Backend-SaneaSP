import { DataTypes, Model, Optional } from "sequelize";
import sequelize from '../config/database.config'
import { IImagemDenuncia } from "../interfaces/imagem-denuncia";

const IMAGE_BASE_URL = `${process.env.HOST}:${process.env.PORT}/public`;

type ImagemDenunciaCreationalAttributes = Optional<IImagemDenuncia, "id" | "url">;
export class ImagemDenunciaModel extends Model<IImagemDenuncia, ImagemDenunciaCreationalAttributes> {
    public id!: number;
    public nome!: string;
    public id_denuncia!: number

    public get url(): string {
        return `${IMAGE_BASE_URL}/denuncias/${this.nome}`;
    }
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
    },
    url: {
        type: DataTypes.VIRTUAL,
        get(this: ImagemDenunciaModel) {
            return `${IMAGE_BASE_URL}/denuncias/${this.getDataValue("nome")}`;
        }
    }
}, {
    tableName: 'imagem_denuncia',
    sequelize,
    timestamps: false
})