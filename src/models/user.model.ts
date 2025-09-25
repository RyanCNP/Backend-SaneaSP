import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import { IEndereco } from "../interfaces/endereco";
import { IUser, UserLevel } from "../interfaces/usuario";

export type IUserCreationAttributes = Optional<IUser, 'id'>;

export class UserModel extends Model<IUser, IUserCreationAttributes> {
    public id!: number;
    public nome!: string;
    public telefone?: string;
    public email!: string;
    public senha!: string;
    public cpf!: string;
    public cep?: string;
    public cidade?: string;
    public bairro?: string;
    public rua?: string;
    public numero?: string;
    public complemento?: string;
    public nivel!: UserLevel;
}

UserModel.init({
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        field: 'id_usuario'
    },
    nome: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: 'nome_usuario'
    },
    telefone: {
        type: DataTypes.STRING(14),
        allowNull: true,
        field: 'telefone'
    },
    email: {
        type: DataTypes.STRING(40),
        allowNull: false,
        unique: true,
        field: 'email'
    },
    senha: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: 'senha'
    },
    cpf: {
        type: DataTypes.CHAR(11),
        allowNull: true,
        unique: true,
        field: 'cpf'
    },
    cep: {
        allowNull: true,
        type: DataTypes.CHAR(9),
        field: "cep"
    },
    cidade: {
        allowNull: true,
        type: DataTypes.STRING(100),
        field: "cidade"
    },
    bairro: {
        allowNull: true,
        type: DataTypes.STRING(100),
        field: "bairro"
    },
    rua: {
        allowNull: true,
        type: DataTypes.STRING(255),
        field: "rua"
    },
    numero: {
        allowNull: true,
        type: DataTypes.STRING(5),
        field: "numero"
    },
    complemento: {
        allowNull: true,
        type: DataTypes.STRING(20),
        field: "complemento"
    },
    nivel: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: UserLevel.COMMON,
        field: 'nivel'
    }
}, {
    tableName: 'usuario',
    sequelize,
    timestamps: false
})