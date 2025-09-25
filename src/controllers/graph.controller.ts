

import sequelize, { FindAttributeOptions, Sequelize } from "sequelize";
import { IfilterGraph } from "../interfaces/graph";
import { DenunciaModel } from "../models";

export const getBigPoints = async(params:IfilterGraph) =>{
    let groupBy:string = 'cidade';
    let whereCidade:any = {};
    let selects: FindAttributeOptions = ['cidade', [sequelize.fn('SUM',sequelize.col('pontuacao')),'total']];
    if(params.cidade){
        whereCidade = {
            cidade : params.cidade
        };
        groupBy = "bairro";
        selects.push('bairro');
    }
    const result = await DenunciaModel.findAll({
       attributes : selects,
       where: whereCidade,
       order:[
        ['total','DESC']
       ],
       group:groupBy,
       limit: params?.limit || 10

    })
    return result;
}