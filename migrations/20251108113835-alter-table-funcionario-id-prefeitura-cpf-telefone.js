'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('funcionario', 'cpf', {
      type: Sequelize.STRING(11),
      allowNull: false,
    });
    await queryInterface.addColumn('funcionario', 'telefone', {
      type: Sequelize.STRING(11),
      allowNull: true,
    });
    await queryInterface.addColumn('funcionario', 'id_prefeitura', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'prefeitura', key: 'id' },
      onDelete: 'CASCADE',
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('funcionario', 'cpf');
    await queryInterface.removeColumn('funcionario', 'telefone');
    await queryInterface.removeColumn('funcionario', 'id_prefeitura');
  }
};
