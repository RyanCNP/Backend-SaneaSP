// import type { Request, Response } from "express"
// import type { ICreateDenunciaFeedback, ICreateInterfaceFeedback } from "../interfaces/feedback"
// import * as feedbackService from "../services/feedback.service"
// import { ApiError } from "../errors/ApiError.error"
// import { HttpCode } from "../enums/HttpCode.enum"

// export const getAllDenunciaFeedbacks = async (req: Request, res: Response) => {
//     const feedbacks = await feedbackService.findAllFeedbacks()
//     res.status(200).json(feedbacks)
// }

// export const getAllInterfaceFeedbacks = async (req: Request, res: Response) => {
//     const feedbacks = await feedbackService.findAllInterfaceFeedbacks()
//     res.status(200).json(feedbacks)
// }

// export const postDenunciaFeedback = async (req: Request, res: Response) => {
//     const feedback: ICreateDenunciaFeedback = req.body
//     const newFeedback = await feedbackService.createDenunciaFeedback(feedback)
//     res.status(201).json(newFeedback)
// }

// export const postInterfaceFeedback = async (req: Request, res: Response) => {
//     const feedback: ICreateInterfaceFeedback = req.body
//     const newFeedback = await feedbackService.createInterfaceFeedback(feedback)
//     res.status(201).json(newFeedback)
// }

// export const deleteFeedback = async (req: Request, res: Response) => {
//     const { id } = req.params
//     const deletedFeedback = await feedbackService.deleteFeedback(Number(id))
//     res.status(200).json(deletedFeedback)
// }