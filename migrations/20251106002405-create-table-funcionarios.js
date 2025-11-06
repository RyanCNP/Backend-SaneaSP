"use strict";

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("funcionario", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_usuario: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: "usuario", key: "id" },
        onDelete: "CASCADE",
      },
      nivel: {
        allowNull: true,
        type: DataTypes.STRING(30),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('funcionario');
  },
};
