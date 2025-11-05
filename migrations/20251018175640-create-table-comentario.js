"use strict";

const { DataType } = require("sequelize-typescript");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("comentarios", {
      id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataType.INTEGER,
      },
      descricao: {
        type: DataType.STRING(500),
        allowNull: false,
      },
      dataPublicacao: {
        type: DataType.DATE(),
        allowNull: false,
      },
      fk_denuncia: {
        allowNull: false,
        type: DataType.INTEGER,
        references: { model: "denuncia", key: "id" },
        onDelete: "CASCADE",
      },
      fk_usuario: {
        // depois trocar para fk_cidadao e fk_funcionario
        allowNull: false,
        type: DataType.INTEGER,
        references: { model: "usuario", key: "id" },
        onDelete: "CASCADE",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("comentarios");
  },
};
