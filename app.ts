import express from "express";
import cors from "cors";
import path from "path";

import categoriaRoutes from "./src/routes/categoria.routes";
import denunciaRoutes from "./src/routes/denuncia.routes";
import userRoutes from "./src/routes/user.routes";
import locationRoutes from "./src/routes/location.routes"
import { authRoutes } from "./src/routes/auth.routes";
import graphRoutes from "./src/routes/graph.routes";

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

app.use("/location", locationRoutes)
// Acesso público às imagens
app.use("/public", express.static(path.join(__dirname, "public")));

// Middleware de erro
app.use(errorHandler);

// Inicialização do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend do SaneaSP está rodando na porta ${PORT}`);
});
