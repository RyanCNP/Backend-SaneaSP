import { Server } from "socket.io";
import { IComentario, IComentarioInput } from "../interfaces/comentario";
import {
  createComentario,
  findAllComententarios,
} from "../services/comentario.service";
import { ComentarioModel } from "../models/comentario.model";

export function initSockets(server: any) {
  const io = new Server(server, {
    cors: {
      origin: ["http://localhost:4200"],
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`Cliente conectado: ${socket.id}`);
    socket.on("allComentarios", async (idUsuario?: number) => {
      const comentarios: IComentario[] = await findAllComententarios(idUsuario);
      io.emit("allComentarios", comentarios);
    });

    socket.on("newComentario", async (msg: IComentarioInput) => {
      const newComentario = await createComentario(msg);
      io.emit("comentario", newComentario);
    });
    socket.on("disconnect", () => {
      console.log(`Cliente desconectado: ${socket.id}`);
    });
  });
}
