import { CategoriaModel } from "./categoria.model";
import { DenunciaModel } from "./denuncia.model";
import { CategoriaDenunciaModel } from "./categoria-denuncia.model";
import { ImagemDenunciaModel } from "./imagem-denuncia.model";
import { ComentarioModel } from "./comentario.model";
import { UserModel } from "./user.model";
import { GrupoCategoriaModel } from "./grupo-categoria.model";
import { RegistroModel } from "./registro.model";
import { ImagemRegistroModel } from "./imagem-registro.model";

//Adicionando associação entre Tag e Reclamações
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

//Adicionando associação entre Imagem e Reclamações
DenunciaModel.hasMany(ImagemDenunciaModel, {
  foreignKey: "id_denuncia",
  as: "imagens",
  onDelete: "CASCADE",
});
ImagemDenunciaModel.belongsTo(DenunciaModel, {
  foreignKey: "id_denuncia",
  as: "denuncia",
});

ComentarioModel.belongsTo(UserModel, {
  foreignKey: "fkUsuario",
  as: "usuario",
});

ComentarioModel.belongsTo(DenunciaModel, {
  foreignKey: "fkDenuncia",
  as: "denuncia",
});
//Adicionando associação entre GrupoCategoria e Categorias
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

RegistroModel.belongsTo(DenunciaModel, {
  foreignKey: "id_denuncia",
  as: "denuncia",
});
RegistroModel.belongsTo(UserModel, { foreignKey: "id_usuario", as: "usuario" });

RegistroModel.hasMany(ImagemRegistroModel, {
  foreignKey: "id_registro",
  as: "arquivos",
  onDelete: "CASCADE",
});
ImagemRegistroModel.belongsTo(RegistroModel, {
  foreignKey: "id_registro",
  as: "registro",
});

//Fazendo o export dos models com as modificações
export {
  DenunciaModel,
  CategoriaModel,
  CategoriaDenunciaModel,
  ImagemDenunciaModel,
  ComentarioModel,
  GrupoCategoriaModel,
  RegistroModel,
  ImagemRegistroModel,
};
