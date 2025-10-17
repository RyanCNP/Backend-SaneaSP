import { Server } from "socket.io";
import { ComentarioInput } from "../interfaces/comentario";

export function initSockets(server: any) {
    const io = new Server(server, {
        cors: {
            origin: ["http://localhost:4200"],
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', socket => {
        console.log(`Cliente conectado: ${socket.id}`);

        socket.on("comentario", (msg : ComentarioInput) => {
            console.log("Mensagem recebida:", msg);
            io.emit('comentario',msg);
        });
        socket.on("disconnect", () => {
            console.log(`Cliente desconectado: ${socket.id}`);
        });
    });
}