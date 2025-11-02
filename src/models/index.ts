import { CategoriaModel } from "./categoria.model";
import { DenunciaModel } from "./denuncia.model";
import { CategoriaDenunciaModel } from "./categoria-denuncia.model";
import { ImagemDenunciaModel } from "./imagem-denuncia.model";
import { ComentarioModel } from "./comentario.model";
import { UserModel } from "./user.model";
import { GrupoCategoriaModel } from "./grupo-categoria.model";
import { CidadaoModel } from "./cidadao.model";

//CATEGORIAS E DENUNCIAS
DenunciaModel.belongsToMany(CategoriaModel, {
  through: CategoriaDenunciaModel,
  foreignKey: "id_denuncia",
  as: "categorias",
});
CategoriaModel.belongsToMany(DenunciaModel, {
  through: CategoriaDenunciaModel,
  foreignKey: "id_categoria",
  as: "denuncias",
});

DenunciaModel.belongsToMany(CategoriaModel, {
  through: CategoriaDenunciaModel,
  foreignKey: "id_denuncia",
  as: "categoriasSelecionadas",
});

//IMAGENS_DENUNCIA E DENUNCIAS
DenunciaModel.hasMany(ImagemDenunciaModel, {
  foreignKey: "id_denuncia",
  as: "imagens",
  onDelete: "CASCADE",
});
ImagemDenunciaModel.belongsTo(DenunciaModel, {
  foreignKey: "id_denuncia",
  as: "denuncia",
});

//COMENTARIOS E DENUNCIAS
ComentarioModel.belongsTo(UserModel, {
  foreignKey: "fkUsuario",
  as: "usuario",
});

ComentarioModel.belongsTo(DenunciaModel, {
  foreignKey: "fkDenuncia",
  as: "denuncia",
});

//GRUPO_CATEGORIAS E CATEGORIAS
GrupoCategoriaModel.hasMany(CategoriaModel, {
  foreignKey: "id_grupo",
  as: "categorias",
  onDelete: "CASCADE",
});
CategoriaModel.belongsTo(GrupoCategoriaModel, {
  foreignKey: "id_grupo",
  as: "grupo",
  onDelete: "CASCADE",
});

//USUARIO E CIDADÃO/PREFEITURA/FUNCIONARIO
UserModel.hasOne(CidadaoModel, {
  foreignKey: "idUsuario",
  as: "cidadao",
  onDelete: "CASCADE",
});

CidadaoModel.belongsTo(UserModel, { 
    foreignKey: "idUsuario", 
    as: "usuario",
    onDelete: "CASCADE"
});

//Fazendo o export dos models com as modificações
export {
  DenunciaModel,
  CategoriaModel,
  CategoriaDenunciaModel,
  ImagemDenunciaModel,
  ComentarioModel,
  GrupoCategoriaModel,
  UserModel,
  CidadaoModel
};
