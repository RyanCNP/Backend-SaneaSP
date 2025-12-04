'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Alterar status para string e default 'aberto'
    await queryInterface.removeColumn('denuncia','status');
    await queryInterface.addColumn('denuncia', 'status', {
      type: Sequelize.STRING(50),
      allowNull: false,
      defaultValue: 'aberto'
    });

    // Tornar campos obrigatórios
    await queryInterface.changeColumn('denuncia', 'cep', {
      type: Sequelize.STRING(30),
      allowNull: false
    });
    await queryInterface.changeColumn('denuncia', 'bairro', {
      type: Sequelize.STRING(30),
      allowNull: false
    });
    await queryInterface.changeColumn('denuncia', 'rua', {
      type: Sequelize.STRING(30),
      allowNull: false
    });
    await queryInterface.changeColumn('denuncia', 'cidade', {
      type: Sequelize.STRING(30),
      allowNull: false
    });
  },

  async down (queryInterface, Sequelize) {
    // Reverter status para integer e default 0

    //await queryInterface.removeColumn('denuncia','status');

    // Reverter campos para allowNull true
    await queryInterface.changeColumn('denuncia', 'cep', {
      type: Sequelize.STRING(30),
      allowNull: true
    });
    await queryInterface.changeColumn('denuncia', 'bairro', {
      type: Sequelize.STRING(30),
      allowNull: true
    });
    await queryInterface.changeColumn('denuncia', 'rua', {
      type: Sequelize.STRING(30),
      allowNull: true
    });
    await queryInterface.changeColumn('denuncia', 'cidade', {
      type: Sequelize.STRING(30),
      allowNull: true
    });
  }
};
