import type { IFeedback, ICreateFeedback } from "../interfaces/feedback"
import { FeedbackModel } from "../models/feedback.model"
import { Op } from "sequelize"
import { ApiError } from "../errors/ApiError.error"
import { HttpCode } from "../enums/HttpCode.enum"

export const findAllFeedbacks = async (): Promise<IFeedback[]> => {
    const feedbacks = await FeedbackModel.findAll()

    if (!feedbacks) throw new ApiError("Nenhum feedback encontrado", HttpCode.NotFound)

    return feedbacks
}

export const findFeedbackById = async (id: number): Promise<IFeedback> => {
    const feedback = await FeedbackModel.findByPk(id)

    if (!feedback) throw new ApiError("Nenhum feedback encontrado", HttpCode.NotFound)

    return feedback
}

export const findFeedbackByIdDenuncia = async (idDenuncia: number): Promise<IFeedback> => {
    const feedback = await FeedbackModel.findOne({ where: { fk_denuncia: idDenuncia } })

    if (!feedback) throw new ApiError("Nenhum feedback encontrado", HttpCode.NotFound)

    return feedback
}

export const findFeedbacksByIdCidadao = async (idCidadao: number): Promise<IFeedback[]> => {
    const feedbacks = await FeedbackModel.findAll({ where: { fk_cidadao: idCidadao } })

    if (!feedbacks) throw new ApiError("Nenhum feedback encontrado", HttpCode.NotFound)

    return feedbacks
}

export const createFeedback = async (body: ICreateFeedback): Promise<IFeedback> => {
    const {data_publicacao, ...fk_cidadao } = body;

    const newFeedback = {
        data_publicacao: new Date(),
        ...fk_cidadao
    }

    const feedback = await FeedbackModel.create(newFeedback)

    return feedback
}

export const updateFeedback = async (id: number, body: ICreateFeedback): Promise<IFeedback> => {
    const feedbackFound = await FeedbackModel.findOne({ where: { id } })

    if (!feedbackFound) throw new ApiError("Nenhum feedback encontrado", HttpCode.NotFound)

    return await feedbackFound.update(body)
}

export const deleteFeedback = async (id: number): Promise<IFeedback> => {
    const feedbackFound = await FeedbackModel.findByPk(id)

    if (!feedbackFound) throw new ApiError("Nenhum feedback encontrado", HttpCode.NotFound)

    await feedbackFound.destroy()

    return feedbackFound
}