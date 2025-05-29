'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn('Usuarios', 'nivel', 'nivel_usuario');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn('Usuarios', 'nivel_usuario', 'nivel');
  }
};
