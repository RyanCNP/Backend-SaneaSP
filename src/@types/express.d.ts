import { IUser } from '../interfaces/iUser.interface';
declare global{
    namespace Express{
        export interface Request{
            user: Partial<IUser>
        }
    }
}