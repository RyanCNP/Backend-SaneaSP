import express from "express";
import { validateToken } from "../middlewares/auth.middleware";
import { getAllComentario } from "../controllers/comentario.controller";
export const routes = express.Router();

routes.get("/:id",getAllComentario);

export default routes;
