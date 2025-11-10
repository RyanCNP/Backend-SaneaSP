import express from "express";
import cors from "cors";
import path from "path";
import categoriaRoutes from "./src/routes/categoria.routes";
import denunciaRoutes from "./src/routes/denuncia.routes";
import userRoutes from "./src/routes/user.routes";
import prefeituraRoutes from "./src/routes/prefeitura.routes";
import locationRoutes from "./src/routes/location.routes"
import comentarioRoutes from "./src/routes/comentario.routes"
import { authRoutes } from "./src/routes/auth.routes";
import graphRoutes from "./src/routes/graph.routes";
import uploadRoutes from "./src/routes/upload.routes";
import feedbackRoutes from "./src/routes/feedback.routes";
import registroRoutes from "./src/routes/registro.routes";

import { setupSwagger } from "./src/swagger/swagger";
import { errorHandler } from "./src/middlewares/errorHandler.middleware";
import http from 'http'
import { initSockets } from "./src/sockets";
export const app = express();

// Swagger
setupSwagger(app);

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas da API
app.use("/categoria", categoriaRoutes);
app.use("/denuncia", denunciaRoutes);
app.use("/user", userRoutes);
app.use("/prefeitura", prefeituraRoutes);
app.use("/auth", authRoutes);
app.use("/graph", graphRoutes);
app.use('/upload',uploadRoutes);
app.use("/location",locationRoutes);
app.use("/feedback", feedbackRoutes);
app.use("/comentario", comentarioRoutes);
app.use("/registro", registroRoutes);

// Acesso público às imagens
app.use("/public", express.static(path.join(__dirname, "public")));

// Middleware de erro
app.use(errorHandler);

const server = http.createServer(app);
initSockets(server);

const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log(`Backend do SaneaSP está rodando na porta ${PORT}`);
});
