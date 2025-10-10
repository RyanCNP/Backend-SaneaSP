import { CategoriaModel } from "./categoria.model";
import { DenunciaModel } from "./denuncia.model";
import { CategoriaDenunciaModel } from "./categoria-denuncia.model";
import { ImagemDenunciaModel } from "./imagem-denuncia.model";

//Adicionando associação entre Tag e Reclamações
DenunciaModel.belongsToMany(CategoriaModel, 
    {through :  CategoriaDenunciaModel, foreignKey: 'id_denuncia', as : 'categorias'  })
CategoriaModel.belongsToMany(DenunciaModel, 
    {through: CategoriaDenunciaModel, foreignKey: 'id_categoria', as: 'denuncias'})

DenunciaModel.belongsToMany(CategoriaModel,
    {through: CategoriaDenunciaModel, foreignKey:'id_denuncia', as: "categoriasSelecionadas"})

//Adicionando associação entre Imagem e Reclamações
DenunciaModel.hasMany(ImagemDenunciaModel, 
    {foreignKey: 'id_denuncia', as: 'imagens',  onDelete: 'CASCADE'})
ImagemDenunciaModel.belongsTo(DenunciaModel, 
    {foreignKey: 'id_denuncia', as: 'denuncia'})

//Fazendo o export dos models com as modificações
export {
    DenunciaModel, 
    CategoriaModel, 
    CategoriaDenunciaModel,
    ImagemDenunciaModel
};