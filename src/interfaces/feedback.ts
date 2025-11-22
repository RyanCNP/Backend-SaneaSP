import { FeedbackInterface } from "../enums/FeedbackInterface.enum"

export interface IDenunciaFeedback {
    id: number,
    data_publicacao: Date,
    descricao: string,
    fk_denuncia: number
}

export interface ICreateDenunciaFeedback {
    data_publicacao: Date,
    descricao: string,
    fk_denuncia: number
}

export interface IInterfaceFeedback {
    id: number,
    data_publicacao: Date,
    descricao: string,
    tela: FeedbackInterface,
}

export interface ICreateInterfaceFeedback {
    data_publicacao: Date,
    descricao: string,
    tela: FeedbackInterface,
}