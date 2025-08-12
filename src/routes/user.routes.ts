import express, { NextFunction } from "express";
import { Request, Response } from "express";
import {
    getUserList,
    getUserByName,
    getUserById,
    updateUser,
    deleteUser
} from "../controllers/user.controller"
import { IUser, IUserListFilters } from "../interfaces/usuario";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    const userFilter = req.query as unknown as IUserListFilters;
    const foundUsers = await getUserList(userFilter);

    res.status(200).json(foundUsers);
});

router.get("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    const userFound = await getUserById(Number(id));
    res.status(200).json(userFound);
});

router.get("/nome/:nome", async (req: Request, res: Response) => {
    const { nome } = req.params;

    const userFound = await getUserByName(nome);

    res.status(200).json({
        error: false,
        message: "Usuário encontrado",
        data: userFound
    });
});

router.put("/:id", async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const user : IUser = req.body 
    const result = await updateUser({id, ...user});

    res.status(200).json(result);
});

router.delete("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await deleteUser(Number(id));
    res.status(200).json(result);
});

export default router;