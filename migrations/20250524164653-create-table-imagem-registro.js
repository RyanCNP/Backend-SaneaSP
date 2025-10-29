'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('imagem_registro',
      {
        id: {
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
          type: DataTypes.INTEGER,
        },
        nome: {
          allowNull: false,
          type: DataTypes.STRING(100),
        },
        id_registro: {
          allowNull: false,
          type: DataTypes.INTEGER,
          references: {
            model: 'registro',
            key: 'id'
          },
          onDelete: 'CASCADE'
        },
      });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('imagem_registro');
  }
};
