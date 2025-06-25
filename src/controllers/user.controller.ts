import { UserModel, IUserCreationAttributes } from "../models/user.model";
import { Op } from "sequelize"
import { HttpError } from "../enums/HttpError.enum";
import { IApiResponse } from "../interfaces/IApiResponse.interface";
import bcrypt from "bcryptjs"; 
import { IUserListFilters, IUser, IUserExists } from "../interfaces/IUsuario.interface";
import { ERROR } from "sqlite3";
import { ApiError } from "../errors/ApiError.error";

export const getUserList = async (userFilter: IUserListFilters): Promise<IUser[]> => {
    const query: any = { where: {} };

    if (userFilter.nome) { query.where.nome = { [Op.like]: `%${userFilter.nome}%` } };

    if (userFilter.email) { query.where.email = { [Op.like]: `%${userFilter.email}%` } };

    if (userFilter.cpf) { query.where.cpf = { [Op.like]: `%${userFilter.cpf}%` } };

    const user = await UserModel.findAll(query);
    return user;
}

export const getUserById = async (userId: number) => {
    const foundUser = await UserModel.findOne({ where: { id: userId } });
    return foundUser;
}

export const getUserByName = async (userName: string) => {
    const foundUser = await UserModel.findOne({ where: { nome: userName } });
    console.log('Usuario procurado: ' +foundUser)
    return foundUser;
}

export const getUserByEmail = async (userEmail: string) => {
    const foundUser = await UserModel.findOne({ where: { email: userEmail } });
    return foundUser;
}

export const getUserByCPF = async (userCPF: string) => {
    const foundUser = await UserModel.findOne({ where: { cpf: userCPF } });
    return foundUser;
}

export const createUser = async (newUser: IUserCreationAttributes): Promise<IUser> => {
    const salt = await bcrypt.genSalt(10);
    newUser.senha = await bcrypt.hash(newUser.senha, salt);
    const query : IUserExists = {
        where: {
            [Op.or]: [
                { email: newUser.email },
                { nome: newUser.nome }
            ]
        }
    };

    if(newUser.cpf)
        query.where[Op.or].push({ cpf: newUser.cpf });
    
    const userFound = await UserModel.findOne(query);

    if(userFound){
        console.log(userFound)
        console.log(newUser)
        if (userFound.nome == newUser.nome.trim()) 
            throw new ApiError('Usuário com o nome já cadastrado', 409)
        else if(userFound.email == newUser.email.trim())
            throw new ApiError('Usuário com o email já cadastrado', 409)
        else if(userFound.cpf == newUser.cpf.trim())
            throw new ApiError('Usuário com o cpf já cadastrado', 409)
    }
    
    const createdUser = await UserModel.create(newUser);
    return createdUser;
}

export const updateUser = async (userData: IUser): Promise<IApiResponse<IUser>> => {
    const userFound = await UserModel.findOne({ where: { id: userData.id } });

    if (!userFound) {
        return {
            error: true,
            message: "Usuário não encontrado.",
            httpError: HttpError.NotFound
        };
    }

    if (userData.nome && userFound.nome !== userData.nome) {
        const nomeExistente = await UserModel.findOne({
            where: {
                nome: userData.nome,
                id: { [Op.ne]: userData.id }
            }
        });

        if (nomeExistente) {
            return {
                error: true,
                message: "Já existe um usuário com esse nome",
                httpError: HttpError.Conflict
            };
        }
    }

    if (userData.email && userFound.email !== userData.email) {
        const emailExistente = await UserModel.findOne({
            where: {
                email: userData.email,
                id: { [Op.ne]: userData.id }
            }
        });

        if (emailExistente) {
            return {
                error: true,
                message: "Já existe um usuário com esse email",
                httpError: HttpError.Conflict
            };
        }
    }

    await userFound.update(userData);

    return {
        error: false,
        message: "Usuário atualizado com sucesso!",
        data: userFound
    }
}
export const deleteUser = async (userId: number): Promise<IApiResponse> => {
    const userFound = await UserModel.findByPk(userId);

    if (!userFound) {
        return {
            message: 'Nenhum usuário foi encontrado',
            error: true,
            httpError: HttpError.NotFound
        }
    }

    await userFound.destroy();

    return {
        message: 'Usuário excluido com sucesso!',
        error: false,
        data: userFound
    }
}