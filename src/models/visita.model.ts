import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database.config';
import { IVisita } from '../interfaces/visita';


interface VisitaCreationAttributes extends Optional<IVisita, 'id'> {}


export class VisitaModel extends Model<IVisita, VisitaCreationAttributes>
    implements IVisita {
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