import { FeedbackInterface } from "../enums/FeedbackInterface.enum"

export interface IDenunciaFeedback {
    id: number,
    data_publicacao: Date,
    descricao: string,
    fk_denuncia: number
}

export type TDenunciaFeedbackCreate = Pick<IDenunciaFeedback, 'descricao' | 'fk_denuncia'>

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