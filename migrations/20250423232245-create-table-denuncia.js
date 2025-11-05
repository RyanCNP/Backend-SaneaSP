"use strict";

const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("denuncia", {
      id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      titulo: {
        allowNull: false,
        type: DataTypes.STRING(50),
      },
      descricao: {
        allowNull: false,
        type: DataTypes.STRING(500),
      },
      dataPublicacao: {
        allowNull: false,
        type: DataTypes.DATE(),
      },
      status: {
        allowNull: true,
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      cep: {
        allowNull: true,
        type: DataTypes.STRING(30),
      },
      cidade: {
        allowNull: true,
        type: DataTypes.STRING(30),
      },
      bairro: {
        allowNull: true,
        type: DataTypes.STRING(30),
      },
      rua: {
        allowNull: true,
        type: DataTypes.STRING(30),
      },
      numero: {
        allowNull: true,
        type: DataTypes.STRING(30),
      },
      complemento: {
        allowNull: true,
        type: DataTypes.STRING(30),
      },
      pontuacao: {
        allowNull: false,
        type: DataTypes.DECIMAL(5, 2),
      },
      id_usuario: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("denuncia");
  },
};
