import { IUser, TSafeUser } from '../interfaces/usuario';
import { Transaction } from 'sequelize';
declare global {
    namespace Express {
        export interface Request {
            user: Partial<TSafeUser>
            newCommonUser: TSafeUser
            transaction?: Transaction; 
        }
    }
}