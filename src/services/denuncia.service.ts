import type { ICreateDenuncia, IFilterListDenuncia, IDenuncia } from "../interfaces/denuncia"
import { Op } from "sequelize"
import { CategoriaModel, ImagemDenunciaModel, DenunciaModel, GrupoCategoriaModel } from "../models"
import { ApiError } from "../errors/ApiError.error"
import { HttpCode } from "../enums/HttpCode.enum"
import ExcelJS from "exceljs";
import { Buffer } from "buffer";

const denunciaFindIncludes = [
  {
    model: CategoriaModel,
    as: "categorias",
    through: { attributes: [] },
    include: [
      {
        model: GrupoCategoriaModel,
        as: "grupo",
        attributes: { exclude: ['id'] },
      }
    ]
  },
  {
    model: ImagemDenunciaModel,
    as: "imagens",
    attributes: { exclude: ["id_denuncia"] },
  },
]

export const findAllDenuncias = async (filtros: IFilterListDenuncia): Promise<IDenuncia[]> => {
  const query: any = {
    where: {},
    include: denunciaFindIncludes,
    order : [['dataPublicacao', "DESC"]]
  }

  if (filtros) {
    if (filtros.titulo) {
      query.where.titulo = { [Op.like]: `%${filtros.titulo}%` }
    }
    if (filtros.rua) {
      query.where.rua = { [Op.like]: `%${filtros.rua}%` }
    }
    if (filtros.cep) {
      query.where.cep = { [Op.like]: `%${filtros.cep}%` }
    }
    if (filtros.bairro) {
      query.where.bairro = { [Op.like]: `%${filtros.bairro}%` }
    }
    if (filtros.cidade) {
      query.where.cidade = { [Op.like]: `%${filtros.cidade}%` }
    }
    if (filtros.status) {
      query.where.status = { [Op.eq]: filtros.status }
    }
    if (filtros.pontuacao) {
      query.where.pontuacao = { [Op.eq]: filtros.pontuacao }
    }
  }

  return await DenunciaModel.findAll(query)
}

export const findDenunciaById = async (idDenuncia: number): Promise<IDenuncia> => {
  const denuncia = await DenunciaModel.findOne({
    where: { id: idDenuncia },
    include: denunciaFindIncludes,
  })

  if (!denuncia) throw new ApiError("Nenhuma reclamação encontrada", HttpCode.NotFound)

  return denuncia
}

export const findUserComplaint = async (fkUsuario: number, filter ?: IFilterListDenuncia): Promise<IDenuncia[]> => {
  const query: any = {
    where: {idUsuario: fkUsuario},
    include: denunciaFindIncludes,
  }
  if (filter && filter.status) {
    query.where.status = { [Op.like]: `%${filter.status}%` }
  }
  
  return await DenunciaModel.findAll(query)
}

export const findDenunciasByCategoria = async (categorias: number[], idUsuario?: number): Promise<IDenuncia[]> => {
  const query: any = {
    where: {},
    include: [
      {
        model: CategoriaModel,
        as: "categoriasSelecionadas",
        through: { attributes: [] },
        where: { id: categorias },
        require: true,
      },
      {
        model: CategoriaModel,
        as: "categorias",
        through: { attributes: [] },
      },
      {
        model: ImagemDenunciaModel,
        as: "imagens",
        attributes: { exclude: ["id_denuncia"] },
      },
    ],
  }

  if (idUsuario) {
    query.where.idUsuario = idUsuario
  }

  return await DenunciaModel.findAll(query)
}

export const createNewDenuncia = async (body: ICreateDenuncia): Promise<IDenuncia> => {
  const { categorias, imagens, ...denunciaBody } = body

  body.pontuacao = calculatePontuacao(body)
  const { pontuacao, ...denunciaBodyWithoutPontuacao } = denunciaBody

  const newDenuncia = {
    status: 0,
    dataPublicacao: new Date(),
    pontuacao: body.pontuacao,
    ...denunciaBodyWithoutPontuacao,
  }

  const denuncia = await DenunciaModel.create(newDenuncia)

  const response = await DenunciaModel.findByPk(denuncia.id, {
    include: denunciaFindIncludes,
  })

  if (!response) throw new ApiError("Não foi possível cadastrar a reclamação", HttpCode.BadRequest)

  return response
}

export const updateDenunciaById = async (idDenuncia: number, body: ICreateDenuncia): Promise<IDenuncia> => {
  body.pontuacao = calculatePontuacao(body)

  await DenunciaModel.update(body, {
    where: { id: idDenuncia },
  })

  const response = await DenunciaModel.findByPk(idDenuncia, {
    include: denunciaFindIncludes,
  })

  if (!response) {
    throw new ApiError("Não foi possível editar a reclamação", HttpCode.BadRequest)
  }

  return response
}

export const deleteDenunciaById = async (idDenuncia: number): Promise<IDenuncia> => {
  const denuncia = await DenunciaModel.findByPk(idDenuncia, {
    include: denunciaFindIncludes,
  })

  if (!denuncia) {
    throw new ApiError("Reclamação não encontrada", HttpCode.NotFound)
  }

  await denuncia.destroy()
  return denuncia
}

function calculatePontuacao(bodyRequest: ICreateDenuncia): number {
  let pontuacao = 0

  if (bodyRequest.imagens && bodyRequest.imagens?.length > 0) {
    pontuacao += 100 * bodyRequest.imagens.length
  }

  if (bodyRequest.categorias && bodyRequest.categorias?.length > 0) {
    pontuacao += 100 * bodyRequest.categorias.length
  }

  if (bodyRequest.cep && bodyRequest.rua && bodyRequest.numero && bodyRequest.bairro && bodyRequest.cidade) {
    pontuacao += 200
  }

  return pontuacao
}
export const exportDenunciasExcel = async (): Promise<Buffer> => {
  const denuncias = await DenunciaModel.findAll({
    include: denunciaFindIncludes
  });

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Denúncias");

  sheet.columns = [
    { header: "ID", key: "id", width: 10 },
    { header: "Título", key: "titulo", width: 30 },
    { header: "Descrição", key: "descricao", width: 40 },
    { header: "Status", key: "status", width: 15 },
    { header: "Pontuação", key: "pontuacao", width: 12 },
    { header: "Data", key: "dataPublicacao", width: 20 },
  ];

  denuncias.forEach((d) => {
    sheet.addRow({
      id: d.id,
      titulo: d.titulo,
      descricao: d.descricao,
      status: d.status,
      pontuacao: d.pontuacao,
      dataPublicacao : d.dataPublicacao
    });
  });

  // Gera o arquivo em memória (Buffer | ArrayBuffer)
  const bufferCandidate: any = await workbook.xlsx.writeBuffer();

  // Se já for um Buffer do Node, retorna direto
  if (Buffer.isBuffer(bufferCandidate)) {
    return bufferCandidate as Buffer;
  }

  // Caso seja ArrayBuffer ou Uint8Array, converte para Buffer do Node
  if (bufferCandidate instanceof ArrayBuffer) {
    return Buffer.from(bufferCandidate);
  }

  if (bufferCandidate instanceof Uint8Array) {
    return Buffer.from(bufferCandidate.buffer);
  }

  // Fallback: converte via Buffer.from
  return Buffer.from(bufferCandidate);
};
