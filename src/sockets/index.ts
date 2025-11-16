import { Server, Socket } from "socket.io";
import { IComentario, TComentarioCreate } from "../interfaces/comentario";
import {
  createComentario,
  findAllComentariosByDenuncia,
} from "../services/comentario.service";

export function initSockets(server: any) {
  const io = new Server(server, {
    cors: {
      origin: ["http://localhost:4200"],
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`Cliente conectado: ${socket.id}`);

    // Listener para buscar comentários
    socket.on("complaintComments", async (idDenuncia: number) => {
      try {
        console.log(`Buscando comentários para denúncia: ${idDenuncia}`);
        const comentarios: IComentario[] = await findAllComentariosByDenuncia(
          idDenuncia
        );
        console.log("comentários encontrados:", comentarios);

        // Envia apenas para o socket que solicitou
        socket.emit("complaintComments", comentarios);
      } catch (err) {
        console.error("Erro ao buscar comentários:", err);
        socket.emit("error-event", {
          message: err instanceof Error ? err.message : String(err),
        });
      }
    });

    socket.on("newComment", async (msg: TComentarioCreate) => {
      try {
        console.log("Novo comentário recebido:", msg);
        await createComentario(msg);
        console.log("Comentário criado no banco");

        const comentarios = await findAllComentariosByDenuncia(msg.idDenuncia);
        console.log("Emitindo lista atualizada de comentários");

        // Envia para TODOS os sockets conectados
        io.emit("complaintComments", comentarios);
      } catch (err) {
        console.error("Erro ao criar comentário:", err);
        socket.emit("error-event", {
          message: err instanceof Error ? err.message : String(err),
        });
      }
    });

    socket.on("disconnect", () => {
      console.log(`Cliente desconectado: ${socket.id}`);
    });
  });
}
