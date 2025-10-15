import express from "express";
import cors from "cors";
import path from "path";
import { Server } from "socket.io";
import {createServer} from 'http';
import categoriaRoutes from "./src/routes/categoria.routes";
import denunciaRoutes from "./src/routes/denuncia.routes";
import userRoutes from "./src/routes/user.routes";
import locationRoutes from "./src/routes/location.routes"
import { authRoutes } from "./src/routes/auth.routes";
import graphRoutes from "./src/routes/graph.routes";
import uploadRoutes from "./src/routes/upload.routes";

import { setupSwagger } from "./src/swagger/swagger";
import { errorHandler } from "./src/middlewares/errorHandler.middleware";
const app = express();

// Swagger
setupSwagger(app);

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas da API
app.use("/categoria", categoriaRoutes);
app.use("/denuncia", denunciaRoutes);
app.use("/user", userRoutes);
app.use("/auth", authRoutes);
app.use("/graph", graphRoutes);
app.use('/upload',uploadRoutes);
app.use("/location",locationRoutes);

// Acesso público às imagens
app.use("/public", express.static(path.join(__dirname, "public")));

// Middleware de erro
app.use(errorHandler);


const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:4200"],
    methods: ["GET", "POST"]
  }
});

// Escuta conexões
io.on("connection", (socket) => {
  console.log(`Cliente conectado: ${socket.id}`);

  socket.on("comentario", (msg) => {
    console.log("Mensagem recebida:", msg);
    // Reenvia para todos os clientes conectados
    io.emit("comentario", msg);
  });

  socket.on("disconnect", () => {
    console.log(`Cliente desconectado: ${socket.id}`);
  });
});

// Inicialização do servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Backend do SaneaSP está rodando na porta ${PORT}`);
});
