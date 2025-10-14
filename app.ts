import express from "express";
import cors from "cors";
import path from "path";

// Importações de Rotas
import categoriaRoutes from "./src/routes/categoria.routes";
import denunciaRoutes from "./src/routes/denuncia.routes";
import userRoutes from "./src/routes/user.routes";
import locationRoutes from "./src/routes/location.routes"
import { authRoutes } from "./src/routes/auth.routes";
import graphRoutes from "./src/routes/graph.routes";
import uploadRoutes from "./src/routes/upload.routes";
import visitaRoutes from './src/routes/visita.routes'; // Rota de Visitas

import { setupSwagger } from "./src/swagger/swagger";
import { errorHandler } from "./src/middlewares/errorHandler.middleware";
const app = express();


// ------------------------------------
// PASSO 1: Middlewares Globais
// ------------------------------------
app.use(cors());
// Habilita o Express a receber e parsear o corpo da requisição como JSON.
app.use(express.json()); 


// ------------------------------------
// PASSO 2: Swagger e Rotas da API
// ------------------------------------

// Swagger
setupSwagger(app);

// Rotas da API
app.use("/categoria", categoriaRoutes);
app.use("/denuncia", denunciaRoutes);
app.use("/user", userRoutes);
app.use("/auth", authRoutes);
app.use("/graph", graphRoutes);
app.use('/upload',uploadRoutes);
app.use("/location",locationRoutes);

// CORREÇÃO: Mova a rota de visitas para cá, após o express.json()
app.use('/visitas', visitaRoutes); 


// ------------------------------------
// PASSO 3: Arquivos Estáticos e Erro
// ------------------------------------

// Acesso público às imagens
app.use("/public", express.static(path.join(__dirname, "public")));

// Middleware de erro (SEMPRE no final, antes da inicialização)
app.use(errorHandler);

// ------------------------------------
// PASSO 4: Inicialização do servidor
// ------------------------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend do SaneaSP está rodando na porta ${PORT}`);
});