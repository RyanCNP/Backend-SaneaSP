// src/models/registro.model.ts

import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database.config';
// IMPORTAÇÃO CRÍTICA: O Model de Visita para definir a relação
import { Visita } from './visita.model'; 

// --- 1. Definição dos Atributos da Tabela Registro ---
interface RegistroAttributes {
  id: number; 
  nome: string; 
  data_criacao: Date; 
  // Adicione aqui todos os outros campos da sua tabela 'registros'
}

// 2. Definição dos Atributos de Criação (ID é opcional na criação)
interface RegistroCreationAttributes extends Optional<RegistroAttributes, 'id'> {}

// 3. Classe do Model
export class Registro extends Model<RegistroAttributes, RegistroCreationAttributes>
  implements RegistroAttributes {
  public id!: number;
  public nome!: string;
  public data_criacao!: Date;
  // Declare aqui todas as propriedades de Registro
  
  // Para fins de associação (opcional, para tipagem)
  public readonly visitas?: Visita[]; 
  
  // CORREÇÃO: Mover a associação para DENTRO da classe como método estático
  // public static associate(models: any) {
  //   // Registro tem muitas Visitas (relação 1:N)
  //   Registro.hasMany(models.Visita, { // Usamos models.Visita, pois index.ts passa o objeto de models
  //       foreignKey: 'fk_registro', // A chave estrangeira que está no Model Visita
  //       as: 'visitas' // O alias usado ao carregar os dados
  //   });
  // }
}

// 4. Inicialização dos Campos (Init)
Registro.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    data_criacao: {
      type: DataTypes.DATE,
      allowNull: false
    }
    // Adicione aqui a inicialização dos outros campos do Registro
  },
  {
    sequelize,
    tableName: 'registros', 
    timestamps: false
  }
);

// REMOVA O BLOCO Registro.associate = () => { ... } se ele existia no final do arquivo!