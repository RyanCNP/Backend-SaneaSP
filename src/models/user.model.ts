import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database.config";
import { IUser } from "../interfaces/usuario";
import { UserType } from "../enums/UserType.enum";

export type IUserCreationAttributes = Optional<IUser, 'idUsuario' | 'verified'>;
export class UserModel extends Model<IUser, IUserCreationAttributes> {
    public idUsuario!: number;
    public nome!: string;
    public email!: string;
    public senha!: string;
    public tipo!: UserType
    public verified!: boolean;
}

UserModel.init({
    idUsuario: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        field: 'id'
    },
    nome: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(40),
        allowNull: false,
        unique: true
    },
    senha: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    tipo: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    verified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    tableName: 'usuario',
    sequelize,
    timestamps: false
})