'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('prefeitura', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      nome_oficial: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      email_institucional: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
      },
      cnpj: {
        type: DataTypes.STRING(14),
        allowNull: false,
        unique: true
      },
      codigo_ibge: {
        type: DataTypes.CHAR(7),
        allowNull: false,
        unique: true
      },
      logo: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      descricao: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      cep: {
        allowNull: true,
        type: DataTypes.CHAR(8)
      },
      cidade: {
        allowNull: true,
        type: DataTypes.STRING(50)
      },
      bairro: {
        allowNull: true,
        type: DataTypes.STRING(50)
      },
      rua: {
        allowNull: true,
        type: DataTypes.STRING(100)
      },
      numero: {
        allowNull: true,
        type: DataTypes.STRING(15)
      },
      complemento: {
        allowNull: true,
        type: DataTypes.STRING(50)
      },
      status_assinatura: {
        type: DataTypes.STRING(30),
        allowNull: false
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('prefeitura');
  }
};
