import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database.config";
import { IRegistro, TipoRegistro, TRegistroCreate } from "../interfaces/registro";
import { StatusDenuncia } from "../enums/statusDenuncia.enum";

export class RegistroModel extends Model<IRegistro, TRegistroCreate> {
    public id!: number;
    public dataPublicacao!: Date;
    public tipo!: TipoRegistro;
    public statusAnterior!: StatusDenuncia;
    public statusPosterior!: StatusDenuncia;
    public idUsuario!: number;
    public idDenuncia!: number;
}

RegistroModel.init(
    {
        id: {
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            type: DataTypes.INTEGER,
            field: "id"
        },
        dataPublicacao: {
            type: DataTypes.DATE(),
            allowNull: false,
            defaultValue: DataTypes.NOW,
            field: "data_publicacao"
        },
        tipo: {
            type: DataTypes.STRING(50),
            allowNull: false,
            field: "tipo"
        },
        statusAnterior: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        statusPosterior: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        idDenuncia: {
            allowNull: false,
            type: DataTypes.INTEGER,
            references: { model: 'denuncia', key: 'id' },
            onDelete: 'CASCADE',
            field: "id_denuncia"
        },
        idUsuario: {
            allowNull: false,
            type: DataTypes.INTEGER,
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