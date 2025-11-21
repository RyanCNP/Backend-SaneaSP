'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // Função UP: O que acontece quando a migration é aplicada (cria a tabela)
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('visita', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      motivo: {
        type: Sequelize.STRING(150),
        allowNull: false
      },
      data_inicio: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      data_final: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      id_registro: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'registro',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('visita');
  }
};