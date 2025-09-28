'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn('usuario', 'id_usuario', 'id');
    await queryInterface.renameColumn('usuario', 'nome_usuario', 'nome');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn('usuario', 'id', 'id_usuario');
    await queryInterface.renameColumn('usuario', 'nome', 'nome_usuario');
  }
};
