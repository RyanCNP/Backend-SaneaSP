import { Server } from "socket.io";
import { IComentario, TComentarioCreate } from "../interfaces/comentario";
import { createComentario, findAllComentarios, findAllComentariosByDenuncia } from "../services/comentario.service";

export function initSockets(server: any) {
    const io = new Server(server, {
        cors: {
            origin: ["http://localhost:4200"],
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', socket => {
        console.log(`Cliente conectado: ${socket.id}`);
        socket.on("allComments", async (idDenuncia:number)=>{
            const comentarios:IComentario[] = await findAllComentariosByDenuncia(idDenuncia);
            io.emit("allComments", comentarios);
        })

        socket.on("newComment", async(msg : TComentarioCreate) => {
              const newComentario = await createComentario(msg)
              // Busca todos os comentários da denúncia após adicionar o novo
              const comentarios = await findAllComentariosByDenuncia(msg.idDenuncia);
              io.emit('allComments', comentarios);
        });
        socket.on("disconnect", () => {
            console.log(`Cliente desconectado: ${socket.id}`);
        });
    });
}