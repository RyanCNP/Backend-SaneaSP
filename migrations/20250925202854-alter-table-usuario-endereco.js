"use strict";

const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("usuario", "endereco");

    await queryInterface.addColumn("usuario", "rua", {
      type: DataTypes.STRING(255),
      allowNull: true,
    });
    await queryInterface.addColumn("usuario", "numero", {
      type: DataTypes.STRING(5),
      allowNull: true,
    });
    await queryInterface.addColumn("usuario", "bairro", {
      type: DataTypes.STRING(100),
      allowNull: true,
    });
    await queryInterface.addColumn("usuario", "cidade", {
      type: DataTypes.STRING(100),
      allowNull: true,
    });
    await queryInterface.addColumn("usuario", "complemento", {
      type: DataTypes.STRING(20),
      allowNull: true,
    });
    await queryInterface.addColumn("usuario", "cep", {
      type: DataTypes.CHAR(9),
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("usuario", "rua");
    await queryInterface.removeColumn("usuario", "cidade");
    await queryInterface.removeColumn("usuario", "bairro");
    await queryInterface.removeColumn("usuario", "cep");
    await queryInterface.removeColumn("usuario", "complmento");
    await queryInterface.removeColumn("usuario", "numero");

    await queryInterface.addColumn("usuario", "endereco", {
      type: DataTypes.JSON,
      allowNull: true,
    });
  },
};
