'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('interface-feedback', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      data_publicacao: {
        allowNull: false,
        type: Sequelize.DATE
      },
      descricao: {
        allowNull: false,
        type: Sequelize.STRING(2048)
      },
      tela: {
        allowNull: false,
        type: Sequelize.STRING(255)
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('interface-feedback');
  }
};
