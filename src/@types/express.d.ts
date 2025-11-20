import { IRegistro } from '../interfaces/registro';
import { IUser, TSafeUser } from '../interfaces/usuario';
import { Transaction } from 'sequelize';
declare global {
    namespace Express {
        export interface Request {
            user: Partial<TSafeUser>
            newCommonUser: TSafeUser
            newRegisterId: IRegistro['id']
            transaction?: Transaction; 
        }
    }
}