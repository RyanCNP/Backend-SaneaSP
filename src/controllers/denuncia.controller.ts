import { ICreateDenuncia, IFilterListDenuncia, IDenuncia } from "../interfaces/denuncia";
import { Op } from "sequelize";
import { CategoriaModel, ImagemDenunciaModel, DenunciaModel } from "../models";
import { createCategoryDenuncia, updateCategoryDenuncia } from "./categoria-denuncia.controller";
import { createImagemDenuncia, updateImagemDenuncia } from "./imagem-denuncia.controller";
import { ApiError } from "../errors/ApiError.error";
import { HttpCode } from "../enums/HttpCode.enum";

const denunciaFindIncludes = [
    {
        //Trazer as categorias da reclamação
        model: CategoriaModel,
        as: 'categorias',
        through: { attributes: [] } //Para dados da tabela associativa CategoriaDenuncias nao vierem juntos do resultado
    },
    {
        //Trazer as imagens da reclamação
        model: ImagemDenunciaModel,
        as: 'imagens',
        attributes: { exclude: ['id_denuncia'] },
    }
]

export const getAllDenuncias = async (filtros: IFilterListDenuncia): Promise<IDenuncia[]> => {
    let query: any = {
        where: {},
        include: denunciaFindIncludes
    }
    if (filtros) {
        if (filtros.titulo) {
            query.where.titulo = {
                [Op.like]: `%${filtros.titulo}%`
            };
        }
        if (filtros.rua) {
            query.where.rua = {
                [Op.like]: `%${filtros.rua}%`
            };
        }
        if (filtros.cep) {
            query.where.cep = {
                [Op.like]: `%${filtros.cep}%`
            };
        }
        if (filtros.bairro) {
            query.where.bairro = {
                [Op.like]: `%${filtros.bairro}%`
            };
        }
        if (filtros.cidade) {
            query.where.cidade = {
                [Op.like]: `%${filtros.cidade}%`
            };
        }
        if (filtros.status) {
            query.where.status = {
                [Op.like]: `%${filtros.status}%`
            };
        }
        // if (filtros.data) {
        //     const data = new Date(filtros.data);
        //     query.where.data = {
        //         [Op.like]: `%${filtros.data}%`
        //     };
        // }
        if (filtros.pontuacao) {
            query.where.pontuacao = {
                [Op.like]: `${filtros.pontuacao}`
            }
        }
    }
    const denuncias = await DenunciaModel.findAll(query);
    return denuncias;
};

export const getById = async (idDenuncia: number): Promise<IDenuncia> => {
    const denuncia = await DenunciaModel.findOne(
        {
            where: { id: idDenuncia },
            include: denunciaFindIncludes
        });

    if (!denuncia)
        throw new ApiError("Nenhuma reclamação encontrada", HttpCode.NotFound)

    return denuncia;
}
export const getByCategoria = async (categorias: number[], idUsuario?: number) => {
    let query: any = {
        where: {},
        include: [
            {
                model: CategoriaModel,
                as: 'categoriasSelecionadas',
                through: { attributes: [] },
                where: { id: categorias },
                require: true
            },
            {
                model: CategoriaModel,
                as: 'categorias',
                through: { attributes: [] },

            },
            {
                //Trazer as imagens da reclamação
                model: ImagemDenunciaModel,
                as: 'imagens',
                attributes: { exclude: ['id_denuncia'] },
            }
        ]
    };
    if (idUsuario) {
        query.where.idUsuario = idUsuario
    }
    const denuncias = await DenunciaModel.findAll(query);
    return denuncias
}
export const getByUsuario = async (fkUsuario: number) => {
    const denuncias = await DenunciaModel.findAll({
        where: { idUsuario: fkUsuario },
        include: denunciaFindIncludes
    })
    return denuncias;
}
export const postDenuncia = async (body: ICreateDenuncia): Promise<IDenuncia> => {
    const { categorias, imagens, ...denunciaBody } = body;

    body.pontuacao = gerarPontuacao(body);
    const { pontuacao, ...denunciaBodyWithoutPontuacao } = denunciaBody;
    const newDenuncia = {
        status: 0,
        dataPublicacao: new Date(),
        pontuacao: body.pontuacao,
        ...denunciaBodyWithoutPontuacao
    };
    //Cria reclamação
    const denuncia = await DenunciaModel.create(newDenuncia);

    if (imagens && imagens.length > 0) {
        await createImagemDenuncia(imagens, denuncia.id);
    }

    // Criando registro de associação
    if (categorias && categorias.length > 0)
        await createCategoryDenuncia(categorias, denuncia.id)

    const response = await DenunciaModel.findByPk(denuncia.id,
        {
            include: denunciaFindIncludes
        })

    if (!response)
        throw new ApiError("Não foi possível cadastrar a reclamação", HttpCode.BadRequest)

    return response
}

export const putDenuncia = async (idDenuncia: number, body: ICreateDenuncia): Promise<IDenuncia> => {
    body.pontuacao = gerarPontuacao(body);

    await DenunciaModel.update(body, {
        where: {
            id: idDenuncia
        }
    })

    if (body.categorias)
        await updateCategoryDenuncia(body.categorias, idDenuncia);

    if (body.imagens) {
        await updateImagemDenuncia(body.imagens, idDenuncia)
    }

    const response = await DenunciaModel.findByPk(idDenuncia, {
        include: denunciaFindIncludes
    })

    if (!response) {
        throw new ApiError("Não foi possível editar a reclamação", HttpCode.BadRequest)
    }

    return response
}

export const deleteDenuncia = async (idDenuncia: number): Promise<IDenuncia> => {
    const denuncia = await DenunciaModel.findByPk(idDenuncia, {
        include: denunciaFindIncludes
    });

    if (!denuncia) {
        throw new ApiError("Reclamação não encontrada", HttpCode.NotFound)
    }

    //Associações com categorias e reclamações são excluidas com cascade
    await denuncia.destroy();

    return denuncia
}

function gerarPontuacao(bodyRequest: ICreateDenuncia): number {
    let pontuacao = 0;
    // por enquanto a pontuação de categoria vai ser pela quantidade de categorias adicionadas nas reclamações
    if (bodyRequest.imagens && bodyRequest.imagens?.length > 0) {
        pontuacao += 100 * bodyRequest.imagens.length;
    }

    // por enquanto a pontuação de categoria vai ser pela quantidade de categorias adicionadas nas reclamações
    if (bodyRequest.categorias && bodyRequest.categorias?.length > 0) {
        pontuacao += 100 * bodyRequest.categorias.length;
    }

    if (bodyRequest.cep && bodyRequest.rua && bodyRequest.numero && bodyRequest.bairro && bodyRequest.cidade) {
        pontuacao += 200
    }

    return pontuacao
}