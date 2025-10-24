import { DataTypes, Model, Optional } from "sequelize";
import { IComentario } from "../interfaces/comentario";
import { DataType } from "sequelize-typescript";
import sequelize from "../config/database.config";
import { IUser } from "../interfaces/usuario";

type ComentarioCreateAttributes = Optional<IComentario, "id">

export class ComentarioModel extends Model<IComentario | ComentarioCreateAttributes> {
    public id !: number;
    public descricao !: string;
    public dataPublicacao !: Date;
    public fkDenuncia !: number;
    public fkUsuario !: number;
    public usuario ?: IUser;
}

ComentarioModel.init(
    {
        id: {
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            type: DataType.INTEGER,
            field:"id"
        },
        descricao: {
            type: DataType.STRING(500),
            allowNull: false,
            field:"descricao"
        },
        dataPublicacao: {
            type: DataTypes.DATE(),
            allowNull: false,
            field:"dataPublicacao"
        },
        fkDenuncia: {
            allowNull: false,
            type: DataType.INTEGER,
            references: { model: 'denuncia', key: 'id' },
            onDelete: 'CASCADE',
            field:"fk_denuncia"
        },
        fkUsuario: { // depois trocar para fk_cidadao e fk_funcionario
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