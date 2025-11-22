

import express from "express";
import cors from "cors";
import path from "path";


import categoriaRoutes from "./src/routes/categoria.routes";
import denunciaRoutes from "./src/routes/denuncia.routes";
import userRoutes from "./src/routes/user.routes";
import prefeituraRoutes from "./src/routes/prefeitura.routes";
import locationRoutes from "./src/routes/location.routes"
import { authRoutes } from "./src/routes/auth.routes";
import graphRoutes from "./src/routes/graph.routes";
import uploadRoutes from "./src/routes/upload.routes";
import feedbackRoutes from "./src/routes/feedback.routes";
import registroRoutes from "./src/routes/registro.routes";
import { setupSwagger } from "./src/swagger/swagger";
import { errorHandler } from "./src/middlewares/errorHandler.middleware";
import http from 'http'
import { initSockets } from "./src/sockets";
import bodyParser from "body-parser";
import stripeRoutes from "./src/routes/stripe.routes";
export const app = express();
import RegistroRoutes from './src/routes/registro.routes';
import VisitasRoutes from './src/routes/visita.routes';
import { setupSwagger } from "./src/swagger/swagger";
import { errorHandler } from "./src/middlewares/errorHandler.middleware";
const app = express();

app.use(cors());

app.use('/api/stripe/webhook', bodyParser.raw({ type: 'application/json' }));

app.use(express.json());

setupSwagger(app);

app.use("/categoria", categoriaRoutes);
app.use("/denuncia", denunciaRoutes);
app.use("/user", userRoutes);
app.use("/prefeitura", prefeituraRoutes);
app.use("/auth", authRoutes);
app.use("/graph", graphRoutes);
app.use('/upload',uploadRoutes);
app.use("/location",locationRoutes);
app.use('/visitas', VisitasRoutes); 
app.use('/registro', RegistroRoutes ); 
app.use('/api/stripe', stripeRoutes);

// Acesso público às imagens
app.use("/public", express.static(path.join(__dirname, "public")));

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Backend do SaneaSP está rodando na porta ${PORT}`);
});