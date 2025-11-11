import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database.config";
import { IUser, TSafeUser } from "../interfaces/usuario";
import { UserType } from "../enums/UserType.enum";

export type IUserCreationAttributes = Optional<IUser, 'id' | 'verified'>;
export class UserModel extends Model<IUser, IUserCreationAttributes> {
    public id!: number;
    public nome!: string;
    public email!: string;
    public senha!: string;
    public tipo!: UserType
    public verified!: boolean;

    getSafeUser() : TSafeUser{
        const { senha, ...safeUser } = this.get();
        return safeUser;
    }
}

UserModel.init({
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
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