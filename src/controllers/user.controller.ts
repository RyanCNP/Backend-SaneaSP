import { UserModel, IUserCreationAttributes } from "../models/user.model";
import { Op } from "sequelize"
import bcrypt from "bcryptjs"; 
import { IUserListFilters, IUser, IUserExists } from "../interfaces/usuario";
import { ApiError } from "../errors/ApiError.error";
import { HttpCode } from "../enums/HttpCode.enum";

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
    if(!foundUser)
        throw new ApiError("Nenhum usuário encontrado",HttpCode.NotFound);
    return foundUser;
}

export const getUserByName = async (userName: string) => {
    const foundUser = await UserModel.findOne({ where: { nome: userName } });
    if(!foundUser)
        throw new ApiError("Nenhum usuário encontrado", HttpCode.NotFound);
    return foundUser;
}

export const updateUser = async (updatedUser: IUser): Promise<IUser> => {
    const userFound = await UserModel.findOne({ where: { id: updatedUser.id } });

    if (!userFound) {
        throw new ApiError("Nenhum usuário encontrado", HttpCode.NotFound)
    }

    //Verifica se o nome, email e CPF estão disponíveis, caso contrário lança ApiError
    await uniqueUserValidator(updatedUser);

    return await userFound.update(updatedUser);
}
export const deleteUser = async (userId: number): Promise<IUser> => {
    const userFound = await UserModel.findByPk(userId);

    if (!userFound) throw new ApiError("Nenhum usuário encontrado", HttpCode.NotFound)

    await userFound.destroy();

    return userFound;
}

export const uniqueUserValidator = async (user : IUser) => {
    const query : IUserExists = {
        where: {
            [Op.or]: [
                { email: user.email },
                { nome: user.nome }
            ]
        }
    };

    if (user.cpf)
        query.where[Op.or].push({ cpf: user.cpf });
    
    const userFound = await UserModel.findOne(query);

    if(!userFound) return;

    if(userFound.id != user.id){
        if (userFound.nome.trim() == user.nome.trim()) 
            throw new ApiError('Já existe um usuário com esse nome', HttpCode.Conflict)

        if(userFound.email.trim() == user.email.trim())
            throw new ApiError('Esse email já está em uso', HttpCode.Conflict)

        if(userFound.cpf.trim() == user.cpf.trim())
            throw new ApiError('Esse CPF já está em uso', HttpCode.Conflict)
    }
}