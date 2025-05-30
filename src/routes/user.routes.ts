import express from "express";
import { Request, Response } from "express";
import {
    getUserList,
    getUserByCPF,
    getUserByEmail,
    getUserByName,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from "../controllers/user.controller"
import { IUserListFilters } from "../interfaces/IUser.interface";
import { AutoIncrement } from "sequelize-typescript";
import { IUserCreationAttributes } from "../models/user.model";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        const userFilter = req.query as unknown as IUserListFilters;
        const foundUsers = await getUserList(userFilter);

        res.status(200).json(foundUsers);
    } catch (error) {
        console.log(`Ocorreu um erro de servidor ${error}`);
        res.status(500).json({
            error: true,
            message: `Ocorreu um erro de servidor ${error}`
        });
    }
});

router.get("/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const userFound = await getUserById(Number(id));

        if (!userFound) {
            res.status(404).json({
                error: true,
                message: "Nenhum usuário encontrado"
            });
            return;
        }
        res.status(200).json(userFound);
    } catch (error) {
        console.log(`Ocorreu um erro de servidor ${error}`);
        res.status(500).json({
            error: true,
            message: `Ocorreu um erro de servidor ${error}`
        });
    }
});

router.get("/nome/:nome", async (req: Request, res: Response) => {
    try {
        const { nome } = req.params;
        const userFound = await getUserByName(nome);

        if (!userFound) {
            res.status(404).json({
                error: true,
                message: "Nenhum usuário foi encontrado"
            })
            return;
        }
        res.status(200).json({
            error: false,
            message: "Usuário encontrado",
            data: userFound
        });
    } catch (error) {
        console.log(`Ocorreu um erro de servidor ${error}`);
        res.status(500).json({
            error: true,
            message: `Ocorreu um erro de servidor ${error}`
        });
    }
});

router.get("/cpf/:cpf", async (req: Request, res: Response) => {
    try {
        const { cpf } = req.params;
        const userFound = await getUserByCPF(cpf);

        if (!userFound) {
            res.status(404).json({
                error: true,
                message: "Nenhum usuário foi encontrado"
            })
            return;
        }
        res.status(200).json({
            error: false,
            message: "Usuário encontrado",
            data: userFound
        });
    } catch (error) {
        console.log(`Ocorreu um erro de servidor ${error}`);
        res.status(500).json({
            error: true,
            message: `Ocorreu um erro de servidor ${error}`
        });
    }
});

router.get("/email/:email", async (req: Request, res: Response) => {
    try {
        const { email } = req.params;
        const userFound = await getUserByEmail(email);

        if (!userFound) {
            res.status(404).json({
                error: true,
                message: "Nenhum usuário foi encontrado"
            })
            return;
        }
        res.status(200).json({
            error: false,
            message: "Usuário encontrado",
            data: userFound
        });
    } catch (error) {
        console.log(`Ocorreu um erro de servidor ${error}`);
        res.status(500).json({
            error: true,
            message: `Ocorreu um erro de servidor ${error}`
        });
    }
});

router.post("/", async (req: Request, res: Response) => {
    try {
        const userToCreate = req.body as IUserCreationAttributes;

        const result = await createUser(userToCreate);

        if (result.error) {
            res.status(Number(result.httpError)).json({
                error: true,
                message: result.message
            });
            return;
        }
        res.status(201).json(result);
    } catch (error) {
        console.log(`Ocorreu um erro de servidor ${error} `);
        res.status(500).json({
            error: true,
            message: `Ocorreu um erro de servidor ${error} `,
        });
    }
});

router.put("/:id", async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const {
            nome, telefone, email, senha, cpf, cep, cidade, bairro,
            rua, numero, complemento, nivel } = req.body;
        const result = await updateUser({
            id, nome, telefone, email, senha, cpf, cep, cidade, bairro,
            rua, numero, complemento, nivel
        });

        if (result.error) {
            res.status(Number(result.httpError)).json({
                error: true,
                message: result.message
            });
            return;
        }
        res.status(200).json(result);
    } catch (error) {
        console.log(`Ocorreu um erro de servidor ${error} `);
        res.status(500).json({
            error: true,
            message: `Ocorreu um erro de servidor ${error} `,
        });
    }
});

router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await deleteUser(Number(id));

        if (result.error) {
            res.status(Number(result.httpError)).json({
                error: true,
                message: result.message
            })
            return;
        }
        res.status(200).json(result);
    } catch (error) {
        console.log(`Ocorreu um erro de servidor ${error} `);
        res.status(500).json({
            error: true,
            message: `Ocorreu um erro de servidor ${error} `,
        });
    }
});

export default router;