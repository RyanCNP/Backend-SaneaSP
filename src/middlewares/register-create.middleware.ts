import { NextFunction, Request, Response } from "express";
import { TransactionNotProvided } from "../errors/TransactionNotProvided.error";
import { TipoRegistro, TRegistroCreate } from "../interfaces/registro";
import { createRegistro } from "../services/registro.service";
import { StatusDenuncia } from "../enums/statusDenuncia.enum";
import { findDenunciaById } from "../services/denuncia.service";
import { ApiError } from "../errors/ApiError.error";
import { HttpCode } from "../enums/HttpCode.enum";

export const registerCreateMid = (tipo: TipoRegistro) => async (req: Request, res: Response, next: NextFunction) => {
  const { statusPosterior, idDenuncia, idUsuario } = req.body;
  const transaction = req.transaction;
  
  if (!transaction) throw new TransactionNotProvided("Ocorreu um problema ao criar o seu registro");
  
  const denuncia = await findDenunciaById(idDenuncia)

  if(!denuncia) {
    transaction.rollback();
    throw new ApiError('Nenhuma denúncia encontrada', HttpCode.NotFound)
  }

  const newRegister: TRegistroCreate = {
    idDenuncia,
    idUsuario,
    tipo,
    statusPosterior: tipo === TipoRegistro.Agendamento
    ? StatusDenuncia.VisitaAgendada
    : statusPosterior,
    statusAnterior : denuncia.status
  };

  if (!Object.values(StatusDenuncia).includes(newRegister.statusPosterior)) {
    throw new ApiError('Novo status para a denúncia inválido', HttpCode.BadRequest)
  }

  req.newRegisterId = (await createRegistro(newRegister, transaction)).id;
  next();
};
