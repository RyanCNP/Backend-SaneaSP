import { UserModel } from "../models/user.model";
import jwt from "jsonwebtoken"
import { jwtDecode } from 'jwt-decode';
import dotenv from "dotenv";
import bcrypt from "bcryptjs"; 
import { IUser } from "../interfaces/iUser.interface";
import { ApiError } from "../errors/ApiError.error";
import { ITokenDecode } from "../interfaces/ITokenDecode.interface";
dotenv.config();

export const autenticar = async (email: string, password: string) => {
  const user = await UserModel.findOne({where : {email : email}});

  if(!user) {
    throw new ApiError('O email não existe', 404)
  };

  const isMatch = await bcrypt.compare(password, user.senha)
  
  if(!isMatch) {
    throw new ApiError('Email ou senha estão incorretos', 401)
  };
   
  const secret = process.env.SECRET_KEY || "";
  if(secret == ""){
    console.error('❌ Secret Key deve ser definida no .env')
    throw new ApiError('Erro interno de servidor')
  }

  const token = jwt.sign(
    {
      id: user.id,
    },
    secret
  );

  return token;
};

export const login = async (token: string) : Promise<IUser | null> =>  {
    const decoded : ITokenDecode = jwtDecode(token)
    const user = await UserModel.findByPk(decoded.id);
    if(!user)
      throw new ApiError('Usuário não encontrado', 404)
    return user;
};
