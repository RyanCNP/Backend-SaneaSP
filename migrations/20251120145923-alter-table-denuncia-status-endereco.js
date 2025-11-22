'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Alterar status para string e default 'aberto'
    await queryInterface.changeColumn('denuncia', 'status', {
      type: Sequelize.STRING(20),
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
    await queryInterface.changeColumn('denuncia', 'status', {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0
    });

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
