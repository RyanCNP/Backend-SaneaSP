
import { CategoriaModel } from "./categoria.model";
import { DenunciaModel } from "./denuncia.model";
import { CategoriaDenunciaModel } from "./categoria-denuncia.model";
import { ImagemDenunciaModel } from "./imagem-denuncia.model";
import { VisitaModel } from "./visita.model"; 
import { RegistroModel } from "./registro.model";
import { ImagemRegistroModel } from "./imagem-registro.model";
import { CidadaoModel } from "./cidadao.model";
import { PrefeituraModel } from "./prefeitura.model";
import { FuncionarioModel } from "./funcionario.model";
import { ComentarioModel } from "./comentario.model";
import { UserModel } from "./user.model";
import { GrupoCategoriaModel } from "./grupo-categoria.model";

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
  foreignKey: "fk_usuario",
  as: "usuario",
});

ComentarioModel.belongsTo(DenunciaModel, {
  foreignKey: "fk_denuncia",
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

//USUARIO E CIDADÃO
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

//FUNCIONARIO E PREFEITURA
PrefeituraModel.hasMany(FuncionarioModel, {
  foreignKey: "id_prefeitura", 
  as: "funcionarios",
  onDelete: "CASCADE",
});

FuncionarioModel.belongsTo(PrefeituraModel, {
  foreignKey: "id_prefeitura",
  as: "prefeitura",
  onDelete: "CASCADE",
});

//Registros
//Adicionando associação entre Registro, Denuncia e Usuario
RegistroModel.belongsTo(DenunciaModel,{foreignKey:'id_denuncia',as:'denuncia'})
RegistroModel.belongsTo(UserModel,{foreignKey:'id_usuario',as:'usuario'})

RegistroModel.hasMany(ImagemRegistroModel,
    { foreignKey: 'id_registro', as: 'arquivos', onDelete: 'CASCADE' })
    
ImagemRegistroModel.belongsTo(RegistroModel,
    { foreignKey: 'id_registro', as: 'registro' })

//Visita
VisitaModel.belongsTo(RegistroModel,{ foreignKey: 'id_registro', as: 'registro', onDelete: 'CASCADE' })
RegistroModel.hasOne(VisitaModel, {foreignKey: 'id_registro', as: 'visita', onDelete: 'CASCADE'})

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
  UserModel,
  CidadaoModel,
  FuncionarioModel,
  PrefeituraModel
};
