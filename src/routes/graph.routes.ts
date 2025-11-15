import express from "express"
import * as graphController from "../controllers/graph.controller"

export const router = express.Router()

router.get("/maioresPontuacoes", graphController.getMaioresPontuacoes)
router.get("/cidades", graphController.getCidades)

export default router
