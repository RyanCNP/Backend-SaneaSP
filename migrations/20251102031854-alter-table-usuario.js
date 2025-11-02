'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("usuario", "tipo", {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: "cidadao"
    });

    await queryInterface.removeColumn("usuario", "telefone");
    await queryInterface.removeColumn("usuario", "cpf");
    await queryInterface.removeColumn("usuario", "cep");
    await queryInterface.removeColumn("usuario", "cidade");
    await queryInterface.removeColumn("usuario", "bairro");
    await queryInterface.removeColumn("usuario", "rua");
    await queryInterface.removeColumn("usuario", "numero");
    await queryInterface.removeColumn("usuario", "complemento");
    await queryInterface.removeColumn("usuario", "nivel");
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("usuario", "tipo");

    async function addColumnIfNotExists(table, column, options) {
      const tableDesc = await queryInterface.describeTable(table);
      if (!tableDesc[column]) {
        await queryInterface.addColumn(table, column, options);
      }
    }

    await addColumnIfNotExists("usuario", "telefone", {
      type: Sequelize.STRING(14),
      allowNull: true
    });
    await addColumnIfNotExists("usuario", "cpf", {
      type: Sequelize.CHAR(11),
      allowNull: true
    });
    await addColumnIfNotExists("usuario", "rua", {
      type: DataTypes.STRING(255),
      allowNull: true,
    });
    await addColumnIfNotExists("usuario", "numero", {
      type: DataTypes.STRING(5),
      allowNull: true,
    });
    await addColumnIfNotExists("usuario", "bairro", {
      type: DataTypes.STRING(100),
      allowNull: true,
    });
    await addColumnIfNotExists("usuario", "cidade", {
      type: DataTypes.STRING(100),
      allowNull: true,
    });
    await addColumnIfNotExists("usuario", "complemento", {
      type: DataTypes.STRING(20),
      allowNull: true,
    });
    await addColumnIfNotExists("usuario", "cep", {
      type: DataTypes.CHAR(9),
      allowNull: true,
    });
    await addColumnIfNotExists("usuario", "nivel", {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    });
  }
};
