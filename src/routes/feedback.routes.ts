import express from "express"
import * as feedbackController from "../controllers/feedback.controller"
import { validateToken } from "../middlewares/auth.middleware"

const router = express.Router()

router.get("/", feedbackController.getAllFeedbacks)
router.get("/:id", feedbackController.getById)

router.use(validateToken)

//router.get("/feedback-cidadao/:id", feedbackController.getByCidadao)
//router.get("/feedback-denuncia/:id", feedbackController.getByDenuncia)

router.post("/create-feedback", feedbackController.postFeedback)
//router.put("/:id", feedbackController.putFeedback)
router.delete("/:id", feedbackController.deleteFeedback)

export default router