'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('funcionario', [
      {
        id_usuario: 4,
        id_prefeitura: 1,
        cpf: '12345678901',
        telefone: '11999999999',
        nivel: 'Administrador'
      },
      {
        id_usuario: 5,
        id_prefeitura: 1,
        cpf: '98765432100',
        telefone: '11988888888',
        nivel: 'Gestor'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.bulkDelete('funcionario', {
      id_usuario: { [Sequelize.Op.in]: [4, 5] }
    }, {});
  }
};
