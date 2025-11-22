import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database.config";
import { IDenunciaFeedback, IInterfaceFeedback } from "../interfaces/feedback";
import { FeedbackInterface } from "../enums/FeedbackInterface.enum";

type DenunciaFeedbackCreationalAttributes = Optional<IDenunciaFeedback, "id">
type InterfaceFeedbackCreationalAttributes = Optional<IInterfaceFeedback, "id">

export class DenunciaFeedbackModel extends Model<IDenunciaFeedback, DenunciaFeedbackCreationalAttributes> implements IDenunciaFeedback {
    public id!: number;
    public data_publicacao!: Date;
    public descricao!: string;
    public fk_denuncia!: number;
}

export class InterfaceFeedbackModel extends Model<IInterfaceFeedback, InterfaceFeedbackCreationalAttributes> implements IInterfaceFeedback {
    public id!: number;
    public data_publicacao!: Date;
    public descricao!: string;
    public tela!: FeedbackInterface;
}

DenunciaFeedbackModel.init({
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        field: "id",
    },
    data_publicacao: {
        allowNull: false,
        type: DataTypes.DATE,
        field: "data_publicacao"
    },
    descricao: {
        allowNull: false,
        type: DataTypes.STRING(2048),
        field: "descricao"
    },
    fk_denuncia: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: "fk_denuncia"
    }
},{
    tableName: "denuncia-feedback",
    sequelize,
    timestamps: false
})

InterfaceFeedbackModel.init({
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        field: "id",
    },
    data_publicacao: {
        allowNull: false,
        type: DataTypes.DATE,
        field: "data_publicacao"
    },
    descricao: {
        allowNull: false,
        type: DataTypes.STRING(2048),
        field: "descricao"
    },
    tela: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: "tela"
    }
},{
    tableName: "interface-feedback",
    sequelize,
    timestamps: false
})