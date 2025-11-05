"use strict";

const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("usuario", {
      id_usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nome_usuario: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      telefone: {
        type: DataTypes.STRING(14),
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING(40),
        allowNull: false,
        unique: true,
      },
      senha: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      cpf: {
        type: DataTypes.CHAR(11),
        allowNull: true,
        unique: true,
      },
      endereco: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      nivel: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      verified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("usuario");
  },
};
