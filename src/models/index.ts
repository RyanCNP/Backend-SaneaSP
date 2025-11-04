
import { CategoriaModel } from "./categoria.model";
import { DenunciaModel } from "./denuncia.model";
import { CategoriaDenunciaModel } from "./categoria-denuncia.model";
import { ImagemDenunciaModel } from "./imagem-denuncia.model";
import { Visita } from "./visita.model"; 
import { RegistroModel } from "./registro.model";


DenunciaModel.belongsToMany(CategoriaModel,
    { through: CategoriaDenunciaModel, foreignKey: 'id_denuncia', as: 'categorias' })
CategoriaModel.belongsToMany(DenunciaModel,
    { through: CategoriaDenunciaModel, foreignKey: 'id_categoria', as: 'denuncias' })

DenunciaModel.belongsToMany(CategoriaModel,
    { through: CategoriaDenunciaModel, foreignKey: 'id_denuncia', as: "categoriasSelecionadas" })


DenunciaModel.hasMany(ImagemDenunciaModel,
    { foreignKey: 'id_denuncia', as: 'imagens', onDelete: 'CASCADE' })
ImagemDenunciaModel.belongsTo(DenunciaModel,
    { foreignKey: 'id_denuncia', as: 'denuncia' })


RegistroModel.hasMany(Visita, {
    foreignKey: 'fk_registro',
    as: 'visitas',
    onDelete: 'CASCADE'
});

Visita.belongsTo(RegistroModel, {
    foreignKey: 'fk_registro',
    as: 'registro'
});


export {
    DenunciaModel,
    CategoriaModel,
    CategoriaDenunciaModel,
    ImagemDenunciaModel,
    RegistroModel,
    Visita
};