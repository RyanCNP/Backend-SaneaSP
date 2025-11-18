import type { IDenunciaFeedback, ICreateDenunciaFeedback, IInterfaceFeedback, ICreateInterfaceFeedback } from "../interfaces/feedback"
import { DenunciaFeedbackModel, InterfaceFeedbackModel } from "../models/feedback.model"
import { Op } from "sequelize"
import { ApiError } from "../errors/ApiError.error"
import { HttpCode } from "../enums/HttpCode.enum"

export const findAllDenunciaFeedbacks = async (): Promise<IDenunciaFeedback[]> => {
    const feedbacks = await DenunciaFeedbackModel.findAll()

    if (feedbacks.length === 0) throw new ApiError("Nenhum feedback de denúncia encontrado", HttpCode.NotFound)

    return feedbacks
}

export const findAllInterfaceFeedbacks = async (): Promise<IInterfaceFeedback[]> => {
    const feedbacks = await InterfaceFeedbackModel.findAll()

    if (feedbacks.length === 0) throw new ApiError("Nenhum feedback de interface encontrado", HttpCode.NotFound)

    return feedbacks
}

export const createDenunciaFeedback = async (body: ICreateDenunciaFeedback): Promise<IDenunciaFeedback> => {
    const {data_publicacao, ...fk_denuncia } = body;

    const newFeedback = {
        data_publicacao: new Date(),
        ...fk_denuncia
    }

    const feedback = await DenunciaFeedbackModel.create(newFeedback)

    return feedback
}

export const createInterfaceFeedback = async (body: ICreateInterfaceFeedback): Promise<IInterfaceFeedback> => {
    const {data_publicacao, ...tela } = body;

    const newFeedback = {
        data_publicacao: new Date(),
        ...tela
    }

    const feedback = await InterfaceFeedbackModel.create(newFeedback)

    return feedback
}

export const deleteDenunciaFeedback = async (id: number): Promise<IDenunciaFeedback> => {
    const feedbackFound = await DenunciaFeedbackModel.findByPk(id)

    if (!feedbackFound) throw new ApiError("Nenhum feedback encontrado", HttpCode.NotFound)

    await feedbackFound.destroy()

    return feedbackFound
}

export const deleteInterfaceFeedback = async (id: number): Promise<IInterfaceFeedback> => {
    const feedbackFound = await InterfaceFeedbackModel.findByPk(id)

    if (!feedbackFound) throw new ApiError("Nenhum feedback encontrado", HttpCode.NotFound)

    await feedbackFound.destroy()

    return feedbackFound
}