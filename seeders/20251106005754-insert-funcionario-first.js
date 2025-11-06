'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('funcionario', [
      {
        id_usuario: 4,
        nivel: 'Analista'
      },
      {
        id_usuario: 5,
        nivel: 'Coordenador'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.bulkDelete('funcionario', {
      id_usuario: { [Sequelize.Op.in]: [4, 5] }
    }, {});
  }
};
