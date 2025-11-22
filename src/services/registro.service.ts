import { DenunciaModel, RegistroModel } from "../models";
import { UserModel } from "../models/user.model";

const includeRegistro = [
    {
      model: DenunciaModel,
      as: "denuncia"
    },
    {
      model: UserModel,
      as: "usuario"
    },
]

// Criar
export const createRegistro = async (data: {
  descricao: string;
  dataPublicacao: Date;
  tipo: number;
  fkDenuncia: number;
  fkUsuario: number;
}) => {
  return await RegistroModel.create(data);
};

// Buscar todos
export const getAllRegistros = async () => {
  return await RegistroModel.findAll({include:includeRegistro});
};

// Buscar por ID
export const getRegistroById = async (id: number) => {
  return await RegistroModel.findOne({
    where:{id},
    include:includeRegistro
  });
};

// Atualizar
export const updateRegistro = async (
  id: number,
  data: {
    descricao?: string;
    dataPublicacao?: Date;
    tipo?: number;
    fkDenuncia?: number;
    fkUsuario?: number;
  }
) => {
  const registro = await RegistroModel.findByPk(id);
  if (!registro) return null;

  await registro.update(data);
  return registro;
};

// Deletar
export const deleteRegistro = async (id: number) => {
  const registro = await RegistroModel.findByPk(id);
  if (!registro) return false;

  await registro.destroy();
  return true;
};
