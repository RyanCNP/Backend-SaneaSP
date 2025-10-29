"use strict";

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("registro", {
      id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      descricao: {
        allowNull: false,
        type: DataTypes.STRING(500),
      },
      data_publicacao: {
        allowNull: false,
        type: DataTypes.DATE(),
      },
      tipo: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      id_denuncia: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "denuncia",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      id_usuario:{
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "usuario",
          key: "id",
        },
        onDelete: "CASCADE",
      }
    });
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.dropTable('registro');

  },
};
