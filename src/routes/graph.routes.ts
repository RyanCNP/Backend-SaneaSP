import express from "express"
import * as graphController from "../controllers/graph.controller"

export const router = express.Router()

router.get("/maioresPontuacoes", graphController.getMaioresPontuacoes)

export default router
