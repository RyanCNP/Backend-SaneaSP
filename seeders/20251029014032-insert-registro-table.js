'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('registro', [
      {
        data_publicacao: new Date('2025-10-25T10:30:00Z'),
        tipo: 'agendamento',
        statusAnterior: 'aberto',
        statusPosterior: 'agendado',
        id_denuncia: 1,
        id_usuario: 1,
      },
      {
        data_publicacao: new Date('2025-10-26T14:00:00Z'),
        tipo: 'agendamento',
        statusAnterior: 'aberto',
        statusPosterior: 'agendado',
        id_denuncia: 1,
        id_usuario: 2,
      },
      {
        data_publicacao: new Date('2025-10-27T09:45:00Z'),
        tipo: 'relatorio',
        statusAnterior: 'aberto',
        statusPosterior: 'agendado',
        id_denuncia: 2,
        id_usuario: 2,
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('registro', null, {});
  }
};
