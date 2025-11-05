import { IUser } from "../interfaces/usuario";
declare global {
  namespace Express {
    export interface Request {
      user: Partial<IUser>;
    }
  }
}
