'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cidadao',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        id_usuario: {
          allowNull: false,
          type: DataTypes.INTEGER,
          references: { model: 'usuario', key: 'id' },
          onDelete: 'CASCADE'
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
        cpf: {
          allowNull: true,
          type: DataTypes.CHAR(11),
        },
        telefone: {
          allowNull: true,
          type: DataTypes.CHAR(11)
        },
      });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('cidadao');
  }
};
