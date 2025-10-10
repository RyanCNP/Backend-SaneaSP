import express from "express"
import { getMaioresPontuacoes } from "../controllers/graph.controller"

export const router = express.Router()

router.get("/maioresPontuacoes", getMaioresPontuacoes)

export default router
