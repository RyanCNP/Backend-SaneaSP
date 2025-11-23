// import express from "express"
// import * as feedbackController from "../controllers/feedback.controller"
// import { validateToken } from "../middlewares/auth.middleware"
import { permissionMid } from "../middlewares/permission.middleware"
import { NivelFuncionario } from "../enums/NivelFuncionario.enum"

// const router = express.Router()

router.get("/denuncia-feedback/:id", feedbackController.getDenunciaFeedbackById)

// router.use(validateToken)

router.post("/denuncia-feedback", feedbackController.postDenunciaFeedback)
router.post("/interface-feedback", feedbackController.postInterfaceFeedback)

router.use(permissionMid(NivelFuncionario.ADMINISTRADOR))

router.get("/denuncia-feedbacks",  feedbackController.getAllDenunciaFeedbacks)
router.get("/interface-feedbacks", feedbackController.getAllInterfaceFeedbacks)
router.get("/interface-feedbacks/tela/:tela", feedbackController.getInterfaceFeedbacksByTela)

router.delete("/interface-feedback/:id", feedbackController.deleteInterfaceFeedback)

// export default router