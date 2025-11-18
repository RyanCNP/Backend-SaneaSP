import type { IDenunciaFeedback, ICreateDenunciaFeedback, IInterfaceFeedback, ICreateInterfaceFeedback } from "../interfaces/feedback"
import { DenunciaFeedbackModel, InterfaceFeedbackModel } from "../models/feedback.model"
import { FeedbackInterface } from "../enums/FeedbackInterface.enum"
import { Op } from "sequelize"
import { ApiError } from "../errors/ApiError.error"
import { HttpCode } from "../enums/HttpCode.enum"

export const findAllDenunciaFeedbacks = async (): Promise<IDenunciaFeedback[]> => {
    const feedbacks = await DenunciaFeedbackModel.findAll()

    if (feedbacks.length === 0) throw new ApiError("Nenhum feedback encontrado", HttpCode.NotFound)

    return feedbacks
}

export const findDenunciaFeedbackById = async (id: number): Promise<IDenunciaFeedback> => {
    const feedback = await DenunciaFeedbackModel.findByPk(id)

    if (!feedback) throw new ApiError("Feedback não encontrado", HttpCode.NotFound)

    return feedback
}

export const findAllInterfaceFeedbacks = async (): Promise<IInterfaceFeedback[]> => {
    const feedbacks = await InterfaceFeedbackModel.findAll()

    if (feedbacks.length === 0) throw new ApiError("Nenhum feedback encontrado", HttpCode.NotFound)

    return feedbacks
}

export const findAllInterfaceFeedbacksByTela = async (tela: FeedbackInterface): Promise<IInterfaceFeedback[]> => {
    const feedbacks = await InterfaceFeedbackModel.findAll({
        where: {
            tela: {
                [Op.eq]: tela
            }
        }
    })

    if (feedbacks.length === 0) throw new ApiError("Nenhum feedback encontrado", HttpCode.NotFound)

    return feedbacks
}

export const createDenunciaFeedback = async (body: ICreateDenunciaFeedback): Promise<IDenunciaFeedback> => {
    const { data_publicacao, ...fk_denuncia } = body;

    const newFeedback = {
        data_publicacao: new Date(),
        ...fk_denuncia
    }

    const feedback = await DenunciaFeedbackModel.create(newFeedback)

    return feedback
}

export const createInterfaceFeedback = async (body: ICreateInterfaceFeedback): Promise<IInterfaceFeedback> => {
    const { data_publicacao, ...tela } = body;

    const newFeedback = {
        data_publicacao: new Date(),
        ...tela
    }

    const feedback = await InterfaceFeedbackModel.create(newFeedback)

    return feedback
}

export const deleteDenunciaFeedback = async (idDenuncia: number): Promise<IDenunciaFeedback> => {
    const feedbackFound = await DenunciaFeedbackModel.findByPk(idDenuncia)

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