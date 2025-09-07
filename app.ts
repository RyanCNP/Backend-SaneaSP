import express from "express";
import cors from 'cors'
import categoriaRoutes from "./src/routes/categoria.routes";
import denunciaRoutes from "./src/routes/denuncia.routes";
import userRoutes from "./src/routes/user.routes";
import locationRoutes from "./src/routes/location.routes"
import { authRoutes } from "./src/routes/auth.routes";
import { setupSwagger } from "./src/swagger/swagger";
import { errorHandler } from "./src/middlewares/errorHandler.middleware";
const app = express();

setupSwagger(app);

app.use(cors()) //Habilita o CORS Cross-Origin resource sharing
app.use(express.json());

app.use("/categoria", categoriaRoutes);
app.use("/denuncia", denunciaRoutes);
app.use("/user", userRoutes)
app.use("/auth", authRoutes)

app.use("/location",locationRoutes)
app.use(errorHandler)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Backend do SaneaSP está rodando na porta ${PORT}`);
});