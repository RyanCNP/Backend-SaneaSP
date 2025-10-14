import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database.config";
import { IFeedback } from "../interfaces/feedback";

export type IFeedbackCreationAttributes = Optional<IFeedback, "id">;

export class FeedbackModel extends Model<IFeedback, IFeedbackCreationAttributes> {
    public id!: number;
    public data_publicacao!: Date;
    public descricao!: string;
    public fk_funcionario!: number;
    public fk_denuncia!: number;
    public fk_cidadao!: number;
}

FeedbackModel.init({
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
    fk_funcionario: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: "fk_funcionario"
    },
    fk_denuncia: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: "fk_denuncia"
    },
    fk_cidadao: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: "fk_cidadao"
    }
},{
    tableName: "feedback",
    sequelize,
    timestamps: false
})