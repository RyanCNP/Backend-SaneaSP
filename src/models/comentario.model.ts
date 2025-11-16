import { DataTypes, Model } from "sequelize";
import { IComentario, TComentarioCreate } from "../interfaces/comentario";
import { DataType } from "sequelize-typescript";
import sequelize from "../config/database.config";

export class ComentarioModel extends Model<IComentario, TComentarioCreate> {
    public id!: number;
    public descricao!: string;
    public dataPublicacao!: Date;
    public idDenuncia!: number;
    public idUsuario!: number;
}

ComentarioModel.init(
    {
        id: {
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            type: DataType.INTEGER,
        },
        descricao: {
            type: DataType.STRING(500),
            allowNull: false,
        },
        dataPublicacao: {
            type: DataTypes.DATE(),
            allowNull: false,
            defaultValue: new Date()
        },
        idDenuncia: {
            allowNull: false,
            type: DataType.INTEGER,
            references: { model: 'denuncia', key: 'id' },
            onDelete: 'CASCADE',
            field:"fk_denuncia"
        },
        idUsuario: {
            allowNull: false,
            type: DataType.INTEGER,
            references: { model: 'usuario', key: 'id' },
            onDelete: 'CASCADE',
            field:'fk_usuario'
        }
    },
    {
        tableName: "comentarios",
        sequelize,
        timestamps:false
    }
)