import { IUser } from '../interfaces/IUsuario.interface';
declare global{
    namespace Express{
        export interface Request{
            user: Partial<IUser>
        }
    }
}