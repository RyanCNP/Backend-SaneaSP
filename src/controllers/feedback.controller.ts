import type { Request, Response } from "express"
import type { IFeedback, ICreateFeedback } from "../interfaces/feedback"
import * as feedbackService from "../services/feedback.service"
import { ApiError } from "../errors/ApiError.error"
import { HttpCode } from "../enums/HttpCode.enum"

export const getAllFeedbacks = async (req: Request, res: Response) => {
    const feedbacks = await feedbackService.findAllFeedbacks()
    res.status(200).json(feedbacks)
}
/*
export const getByCidadao = async (req: Request, res: Response) => {
    const { idCidadao } = req.params
    const feedbacks = await feedbackService.findFeedbacksByIdCidadao(Number(idCidadao))
    res.status(200).json(feedbacks)
}
*/
export const getById = async (req: Request, res: Response) => {
    const { id } = req.params
    const feedback = await feedbackService.findFeedbackById(Number(id))
    res.status(200).json(feedback)
}
/*
export const getByDenuncia = async (req: Request, res: Response) => {
    const { idDenuncia } = req.params
    const feedbacks = await feedbackService.findFeedbackByIdDenuncia(Number(idDenuncia))
    res.status(200).json(feedbacks)
}
*/
export const postFeedback = async (req: Request, res: Response) => {
    const feedback: ICreateFeedback = req.body
    const newFeedback = await feedbackService.createFeedback(feedback)
    res.status(201).json(newFeedback)
}
/*
export const putFeedback = async (req: Request, res: Response) => {
    const { id } = req.params
    const feedback: ICreateFeedback = req.body
    const updatedFeedback = await feedbackService.updateFeedback(Number(id), feedback)
    res.status(200).json(updatedFeedback)
}
*/

export const deleteFeedback = async (req: Request, res: Response) => {
    const { id } = req.params
    const deletedFeedback = await feedbackService.deleteFeedback(Number(id))
    res.status(200).json(deletedFeedback)
}