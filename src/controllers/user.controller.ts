import type { Request, Response } from "express";
import type { IUser, IUserListFilters } from "../interfaces/usuario";
import * as userService from "../services/user.service";

export const getUsers = async (req: Request, res: Response) => {
  const userFilter = req.query as unknown as IUserListFilters;
  const foundUsers = await userService.getUserList(userFilter);
  res.status(200).json(foundUsers);
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userFound = await userService.getUserById(Number(id));
  res.status(200).json(userFound);
};

export const getUserNameById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userFound = await userService.getUserNameById(Number(id));
  res.status(200).json(userFound);
};

export const getUserByName = async (req: Request, res: Response) => {
  const { nome } = req.params;
  const userFound = await userService.getUserByName(nome);
  res.status(200).json({
    error: false,
    message: "Usuário encontrado",
    data: userFound,
  });
};

export const updateUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const user: IUser = req.body;
  const result = await userService.updateUser({ id, ...user });
  res.status(200).json(result);
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await userService.deleteUser(Number(id));
  res.status(200).json(result);
};

export const uniqueUserValidator = userService.uniqueUserValidator;
