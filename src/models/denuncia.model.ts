import { DataTypes, Model, Optional } from "sequelize";
import { IDenuncia } from "../interfaces/denuncia";
import { StatusDenuncia } from "../enums/statusDenuncia.enum";
import sequelize from "../config/database.config";

type DenunciaCreationalAttributes = Optional<IDenuncia, "id">

export class DenunciaModel extends Model<IDenuncia, DenunciaCreationalAttributes> {
    public id!: number;
    public titulo!: string;
    public descricao!: string;
    public dataPublicacao!: Date;
    public status!: StatusDenuncia;
    public pontuacao!: number;
    public cep !: string;
    public cidade !: string;
    public bairro !: string;
    public rua !: string;
    public numero?: string;
    public complemento?: string;
    public idUsuario!: number;
}

DenunciaModel.init(
    {
        id: {
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            type: DataTypes.INTEGER,
            field: "id"
        },
        titulo: {
            allowNull: false,
            type: DataTypes.STRING(50),
            field: "titulo"
        },
        descricao: {
            allowNull: false,
            type: DataTypes.STRING(500),
            field: "descricao"
        },
        dataPublicacao: {
            allowNull: false,
            type: DataTypes.DATE(),
            field: "dataPublicacao"
        },
        status: {
            allowNull: false,
            type: DataTypes.STRING(20),
            field: "status"
        },
        cep: {
            allowNull: false,
            type: DataTypes.STRING(30),
            field: "cep"
        },
        cidade: {
            allowNull: false,
            type: DataTypes.STRING(30),
            field: "cidade"
        },
        bairro: {
            allowNull: false,
            type: DataTypes.STRING(30),
            field: "bairro"
        },
        rua: {
            allowNull: false,
            type: DataTypes.STRING(30),
            field: "rua"
        },
        numero: {
            allowNull: true,
            type: DataTypes.STRING(30),
            field: "numero"
        },
        complemento: {
            allowNull: true,
            type: DataTypes.STRING(30),
            field: "complemento"
        },
        pontuacao: {
            allowNull: false,
            type: DataTypes.DECIMAL(5, 2),
            field: "pontuacao"
        },
        idUsuario: {
            allowNull: false,
            type: DataTypes.INTEGER,
            field: "id_usuario"
        }
    },
    {
        tableName: "denuncia",
        sequelize,
        timestamps: false
    }
);

