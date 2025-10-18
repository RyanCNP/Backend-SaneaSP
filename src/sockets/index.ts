import { Server } from "socket.io";
import { IComentario, IComentarioInput } from "../interfaces/comentario";
import { createComentario } from "../services/comentario.service";

export function initSockets(server: any) {
    const io = new Server(server, {
        cors: {
            origin: ["http://localhost:4200"],
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', socket => {
        console.log(`Cliente conectado: ${socket.id}`);

        socket.on("newComentario", async(msg : IComentarioInput) => {
            const newComentario = await createComentario(msg)
            console.log("Mensagem recebida:", newComentario);
            io.emit('comentario',newComentario);
        });
        socket.on("disconnect", () => {
            console.log(`Cliente desconectado: ${socket.id}`);
        });
    });
}