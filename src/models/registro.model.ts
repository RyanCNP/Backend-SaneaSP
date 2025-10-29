import { DataTypes, Model, Optional } from "sequelize";
import { DataType } from "sequelize-typescript";
import sequelize from "../config/database.config";
import { IRegistro } from "../interfaces/registro";

type RegistroCreateAttributes = Optional<IRegistro, "id">

export class RegistroModel extends Model<IRegistro | RegistroCreateAttributes> {
    public id !: number;
    public descricao !: string;
    public tipo !: number;
    public dataPublicacao !: Date;
    public fkDenuncia !: number;
    public fkUsuario !: number;
}

RegistroModel.init(
    {
        id: {
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            type: DataType.INTEGER,
            field: "id"
        },
        descricao: {
            type: DataType.STRING(500),
            allowNull: false,
            field: "descricao"
        },
        dataPublicacao: {
            type: DataTypes.DATE(),
            allowNull: false,
            field: "data_publicacao"
        },
        tipo: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "tipo"
        },
        fkDenuncia: {
            allowNull: false,
            type: DataType.INTEGER,
            references: { model: 'denuncia', key: 'id' },
            onDelete: 'CASCADE',
            field: "id_denuncia"
        },
        fkUsuario: {
            allowNull: false,
            type: DataType.INTEGER,
            references: { model: 'usuario', key: 'id' },
            onDelete: 'CASCADE',
            field: 'id_usuario'
        },
    },
    {
        tableName: "registro",
        sequelize,
        timestamps:false
    }
)