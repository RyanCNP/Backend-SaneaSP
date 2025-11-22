'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('denuncia-feedback', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER
      },
      data_publicacao: {
        allowNull: false,
        type: DataTypes.DATE
      },
      descricao: {
        allowNull: false,
        type: DataTypes.STRING(2048)
      },
      fk_denuncia: {
          allowNull: false,
          type: DataTypes.INTEGER,
          references: {
            model: 'denuncia',
            key: 'id'
          },
          onDelete: 'CASCADE'
        }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('denuncia-feedback')
  }
};
