import { UserModel } from "../models/user.model";
import { jwtDecode } from 'jwt-decode';
import dotenv from "dotenv";
import { IUser } from "../interfaces/IUser.interface";
dotenv.config();

export const autenticar = async (email: string, password: string) => {
  const login = await UserModel.findOne({
    where: {
      email: email,
      senha: password,
    },
  });
  return login;
};

export const login = async (token: string) : Promise<IUser | null> =>  {
    const decoded : any = jwtDecode(token)
    const user = await UserModel.findByPk(decoded.id);
    return user;
};
