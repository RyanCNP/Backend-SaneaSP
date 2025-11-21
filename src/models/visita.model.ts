import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database.config';
import { IVisita } from '../interfaces/visita';

type VisitaCreationAttributes = Optional<IVisita, 'id'>
export class VisitaModel extends Model<IVisita, VisitaCreationAttributes>
    implements IVisita {
    public id!: number;
    public motivo!: string;
    public dataInicio!: Date;
    public dataFinal!: Date;
    public idRegistro!: number; 
}

VisitaModel.init(
    {
        id: {
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        motivo: {
            allowNull: false,
            type: DataTypes.STRING(150)
        },
        dataInicio: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'data_inicio'
        },
        dataFinal: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'data_final'
        },
        
        idRegistro: {
            type: DataTypes.INTEGER,
            allowNull: false, 
            references: { model: 'denuncia', key: 'id' },
            onDelete: 'CASCADE',
            field: "id_registro"
        }
    },
    {
        sequelize,
        tableName: 'visita',
        timestamps: false
    }
);