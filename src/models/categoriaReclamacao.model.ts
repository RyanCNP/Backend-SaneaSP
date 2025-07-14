import { DataTypes, Model, Optional } from "sequelize";
import sequelize from '../config/database'
import { ICategoriaReclamacao } from "../interfaces/ICategoriaReclamacao.interface";

type CategoriaReclamacaoCreationalAttributes = Optional<ICategoriaReclamacao, "id">

export class CategoriaReclamacaoModel extends Model<ICategoriaReclamacao, CategoriaReclamacaoCreationalAttributes>{
    public id!: number;
    public id_categoria!: number;
    public id_reclamacao!: number
}

CategoriaReclamacaoModel.init({
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER,
        field: "id"
    },
    id_categoria: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: 'categoria',
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    id_reclamacao: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: 'reclamacao',
            key: 'id'
        },
        onDelete: 'CASCADE'
    }
},{
    tableName : 'categoriaReclamacao',
    sequelize,
    timestamps : false
})