import { ICreateReclamacao, IFilterListReclamacao, IReclamacao } from "../interfaces/IReclamacao.interface";
import { Op} from "sequelize";
import { CategoriaModel, ImagemReclamacaoModel, ReclamacaoModel} from "../models";
import { createCategoryReclamacao, updateCategoryReclamacao } from "./categoria-reclamacao.controller";
import { createImagemReclamacao, updateImagemReclamacao } from "./imagem-reclamacao.controller";
import { ApiError } from "../errors/ApiError.error";
import { HttpCode } from "../enums/HttpCode.enum";

const reclamacaoFindIncludes = [
    {
        //Trazer as categorias da reclamação
        model: CategoriaModel,
        as: 'Categorias',  
        through: { attributes: [] } //Para dados da tabela associativa CategoriaReclamacoes nao vierem juntos do resultado
    },
    {
        //Trazer as imagens da reclamação
        model: ImagemReclamacaoModel,
        as: 'Imagens',
        attributes: {exclude : ['id_reclamacao']},
    }
]

export const getAllReclamacoes = async (filtros : IFilterListReclamacao): Promise<IReclamacao[]> =>{
    let query: any = {
        where : {},
        include: reclamacaoFindIncludes
    }
    if(filtros){
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
        if(filtros.pontuacao){
            query.where.pontuacao = {
                [Op.like]: `${filtros.pontuacao}`
            }
        }
    }
    const reclamacoes = await ReclamacaoModel.findAll(query);
    return reclamacoes
};

export const getById = async (idReclamacao: number): Promise<IReclamacao | null> =>{
    const reclamacao = await ReclamacaoModel.findOne(
    {
        where:{id : idReclamacao},
        include: reclamacaoFindIncludes
    });

    if(!reclamacao)
        throw new ApiError("Nenhuma reclamação encontrada", HttpCode.NotFound)

    return reclamacao;
}
export const getByCategoria = async(categorias:number[], idUsuario?: number)=>{
    let query: any = {
        where : {},
        include: [
    {
        model: CategoriaModel,
        as: 'categoriasSelecionadas',  
        through: { attributes: [] },
        where:{id:categorias},
        require:true
    },
    {
        model: CategoriaModel,
        as: 'Categorias',
        through: { attributes: [] },

    },
    {
        //Trazer as imagens da reclamação
        model: ImagemReclamacaoModel,
        as: 'Imagens',
        attributes: {exclude : ['id_reclamacao']},
    }
]
    };
    if(idUsuario){
        query.where.idUsuario = idUsuario
    }
    const reclamacoes = await ReclamacaoModel.findAll(query);
    return reclamacoes
}
export const getByUsuario = async(fkUsuario: number)=>{
    const reclamacoes = await ReclamacaoModel.findAll({
        where:{idUsuario:fkUsuario},
        include: reclamacaoFindIncludes
    })
    return reclamacoes;
}
export const postReclamacao = async (body : ICreateReclamacao):Promise<IReclamacao | null> => {
    const {Categorias, Imagens, ...reclamacaoBody} = body;
    
    const pontuacao = gerarPontuacao(body);

    const newReclamacao = {
      status: 0,
      pontuacao,
      data: new Date(),
      ...reclamacaoBody
    };

    //Cria reclamação
    const reclamacao = await ReclamacaoModel.create(newReclamacao);

    if(Imagens && Imagens.length > 0){
        await createImagemReclamacao(Imagens, reclamacao.id);
    }

    // Criando registro de associação
    if(Categorias && Categorias.length > 0)
        await createCategoryReclamacao(Categorias, reclamacao.id)

    const response = await ReclamacaoModel.findByPk(reclamacao.id, 
    {
        include: reclamacaoFindIncludes
    })

    if(!response)
        throw new ApiError("Não foi possível cadastrar a reclamação", HttpCode.BadRequest)
    
    return response
}

export const putReclamacao = async(idReclamacao : number, body: IReclamacao):Promise<IReclamacao> => {
    body.pontuacao = gerarPontuacao(body);
    
    await ReclamacaoModel.update(body, {
        where :{
            id: idReclamacao
        }
    })

    if(body.Categorias)
        await updateCategoryReclamacao(body.Categorias, idReclamacao);

    if(body.Imagens){
        await updateImagemReclamacao(body.Imagens, idReclamacao)
    }

    const response = await ReclamacaoModel.findByPk(idReclamacao, {
        include: reclamacaoFindIncludes
    })

    if(!response){
        throw new ApiError("Não foi possível editar a reclamação", HttpCode.BadRequest)
    }

    return response
}

export const deleteReclamacao = async(idReclamacao : number): Promise<IReclamacao> => {
    const reclamacao = await ReclamacaoModel.findByPk(idReclamacao, {
        include: reclamacaoFindIncludes
    }); 
    
    if(!reclamacao){
        throw new ApiError("Reclamação não encontrada", HttpCode.NotFound)
    }
    
    //Associações com categorias e reclamações são excluidas com cascade
    await reclamacao.destroy();

    return reclamacao
}

function gerarPontuacao(bodyRequest : ICreateReclamacao | IReclamacao): number {
    let pontuacao = 0;
    // por enquanto a pontuação de categoria vai ser pela quantidade de categorias adicionadas nas reclamações
    if(bodyRequest.Imagens && bodyRequest.Imagens?.length > 0){
        pontuacao += 100 * bodyRequest.Imagens.length;
    }

    // por enquanto a pontuação de categoria vai ser pela quantidade de categorias adicionadas nas reclamações
    if(bodyRequest.Categorias && bodyRequest.Categorias?.length > 0){
        pontuacao += 100 * bodyRequest.Categorias.length;
    }

    if(bodyRequest.cep && bodyRequest.rua && bodyRequest.numero && bodyRequest.bairro && bodyRequest.cidade){
        pontuacao += 200
    }
    
    return pontuacao
}