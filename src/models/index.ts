import { CategoriaModel } from "./categoria.model";
import { ReclamacaoModel } from "./reclamacao.model";
import { CategoriaReclamacaoModel } from "./categoriaReclamacao.model";
import { ImagemReclamacaoModel } from "./imagemReclamacao.model";

//Adicionando associação entre Tag e Reclamações
ReclamacaoModel.belongsToMany(CategoriaModel, 
    {through :  CategoriaReclamacaoModel, foreignKey: 'id_reclamacao', as : 'Categorias'  })
CategoriaModel.belongsToMany(ReclamacaoModel, 
    {through: CategoriaReclamacaoModel, foreignKey: 'id_categoria', as: 'reclamacoes'})

ReclamacaoModel.belongsToMany(CategoriaModel,
    {through: CategoriaReclamacaoModel, foreignKey:'id_reclamacao', as: "categoriasSelecionadas"})

//Adicionando associação entre Imagem e Reclamações
ReclamacaoModel.hasMany(ImagemReclamacaoModel, 
    {foreignKey: 'id_reclamacao', as: 'Imagens'})
ImagemReclamacaoModel.belongsTo(ReclamacaoModel, 
    {foreignKey: 'id_reclamacao', as: 'reclamacao'})

//Fazendo o export dos models com as modificações
export {
    ReclamacaoModel, 
    CategoriaModel, 
    CategoriaReclamacaoModel,
    ImagemReclamacaoModel
};