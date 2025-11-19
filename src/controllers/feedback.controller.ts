import type { Request, Response } from "express"
import type { ICreateDenunciaFeedback, ICreateInterfaceFeedback } from "../interfaces/feedback"
import * as feedbackService from "../services/feedback.service"
import { FeedbackInterface } from "../enums/FeedbackInterface.enum"
import { ApiError } from "../errors/ApiError.error"
import { HttpCode } from "../enums/HttpCode.enum"

export const getAllDenunciaFeedbacks = async (req: Request, res: Response) => {
  try {
    const feedbacks = await feedbackService.findAllDenunciaFeedbacks();
    return res.status(200).json(feedbacks);
  } catch (error) {
    console.error("Erro ao buscar feedbacks de denúncia:", error);
    return res.status(500).json({ message: "Erro interno no servidor." });
  }
};

export const getDenunciaFeedbackById = async (req: Request, res: Response) => {
    const { id } = req.params
    const feedback = await feedbackService.findDenunciaFeedbackById(Number(id))
    res.status(200).json(feedback)
}

export const getAllInterfaceFeedbacks = async (req: Request, res: Response) => {
    const feedbacks = await feedbackService.findAllInterfaceFeedbacks()
    res.status(200).json(feedbacks)
}

export const getInterfaceFeedbacksByTela = async (req: Request, res: Response) => {
    const { tela } = req.params
    const feedback = await feedbackService.findAllInterfaceFeedbacksByTela(tela as FeedbackInterface)
    res.status(200).json(feedback)
}

export const postDenunciaFeedback = async (req: Request, res: Response) => {
    const feedback: ICreateDenunciaFeedback = req.body
    const newFeedback = await feedbackService.createDenunciaFeedback(feedback)
    res.status(201).json(newFeedback)
}

export const postInterfaceFeedback = async (req: Request, res: Response) => {
    const feedback: ICreateInterfaceFeedback = req.body
    const newFeedback = await feedbackService.createInterfaceFeedback(feedback)
    res.status(201).json(newFeedback)
}

export const deleteInterfaceFeedback = async (req: Request, res: Response) => {
    const { id } = req.params
    const deletedFeedback = await feedbackService.deleteInterfaceFeedback(Number(id))
    res.status(200).json(deletedFeedback)
}