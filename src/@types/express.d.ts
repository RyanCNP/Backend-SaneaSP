import { IUser } from '../interfaces/IUser.interface';
declare global{
    namespace Express{
        export interface Request{
            user: Partial<IUser>
        }
    }
}