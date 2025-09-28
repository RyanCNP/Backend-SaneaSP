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
        as: 'Categorias',
        through: { attributes: [] } //Para dados da tabela associativa CategoriaDenuncias nao vierem juntos do resultado
    },
    {
        //Trazer as imagens da reclamação
        model: ImagemDenunciaModel,
        as: 'Imagens',
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
    return denuncias
};

export const getById = async (idDenuncia: number): Promise<IDenuncia | null> => {
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
                as: 'Categorias',
                through: { attributes: [] },

            },
            {
                //Trazer as imagens da reclamação
                model: ImagemDenunciaModel,
                as: 'Imagens',
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
export const postDenuncia = async (body: ICreateDenuncia): Promise<IDenuncia | null> => {
    const { Categorias, Imagens, ...denunciaBody } = body;

    const pontuacao = gerarPontuacao(body);

    const newDenuncia = {
        status: 0,
        pontuacao,
        data: new Date(),
        ...denunciaBody
    };

    //Cria reclamação
    const denuncia = await DenunciaModel.create(newDenuncia);

    if (Imagens && Imagens.length > 0) {
        await createImagemDenuncia(Imagens, denuncia.id);
    }

    // Criando registro de associação
    if (Categorias && Categorias.length > 0)
        await createCategoryDenuncia(Categorias, denuncia.id)

    const response = await DenunciaModel.findByPk(denuncia.id,
        {
            include: denunciaFindIncludes
        })

    if (!response)
        throw new ApiError("Não foi possível cadastrar a reclamação", HttpCode.BadRequest)

    return response
}

export const putDenuncia = async (idDenuncia: number, body: IDenuncia): Promise<IDenuncia> => {
    body.pontuacao = gerarPontuacao(body);

    await DenunciaModel.update(body, {
        where: {
            id: idDenuncia
        }
    })

    if (body.Categorias)
        await updateCategoryDenuncia(body.Categorias, idDenuncia);

    if (body.Imagens) {
        await updateImagemDenuncia(body.Imagens, idDenuncia)
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

function gerarPontuacao(bodyRequest: ICreateDenuncia | IDenuncia): number {
    let pontuacao = 0;
    // por enquanto a pontuação de categoria vai ser pela quantidade de categorias adicionadas nas reclamações
    if (bodyRequest.Imagens && bodyRequest.Imagens?.length > 0) {
        pontuacao += 100 * bodyRequest.Imagens.length;
    }

    // por enquanto a pontuação de categoria vai ser pela quantidade de categorias adicionadas nas reclamações
    if (bodyRequest.Categorias && bodyRequest.Categorias?.length > 0) {
        pontuacao += 100 * bodyRequest.Categorias.length;
    }

    if (bodyRequest.cep && bodyRequest.rua && bodyRequest.numero && bodyRequest.bairro && bodyRequest.cidade) {
        pontuacao += 200
    }

    return pontuacao
}