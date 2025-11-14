import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database.config';


interface VisitaAttributes {
    id: number;
    motivo: string;
    conclusao?: string;
    data_inicio: Date;
    data_final: Date;
    fk_registro: number; 
}


interface VisitaCreationAttributes extends Optional<VisitaAttributes, 'id'> {}


export class VisitaModel extends Model<VisitaAttributes, VisitaCreationAttributes>
    implements VisitaAttributes {
    public id!: number;
    public motivo!: string;
    public conclusao!: string;
    public data_inicio!: Date;
    public data_final!: Date;
    public fk_registro!: number; 
   
}


VisitaModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        motivo: {
            type: DataTypes.STRING(250),
            allowNull: false
        },
        conclusao: {
            type: DataTypes.STRING(250),
            allowNull: true
        },
        data_inicio: {
            type: DataTypes.DATE,
            allowNull: false
        },
        data_final: {
            type: DataTypes.DATE,
            allowNull: false
        },
        
        fk_registro: {
            type: DataTypes.INTEGER,
            allowNull: false, 
        }
    },
    {
        sequelize,
        tableName: 'visitas',
        timestamps: false
    }
);