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
    public endereco?: IEndereco;
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
    endereco: {
        type: DataTypes.JSON,
        allowNull: true,
        field: 'endereco'
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