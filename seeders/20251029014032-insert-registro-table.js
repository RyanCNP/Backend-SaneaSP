'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('registro', [
      {
        descricao: 'Registro inicial referente à denúncia de vazamento no bairro Central.',
        data_publicacao: new Date('2025-10-25T10:30:00Z'),
        tipo: 1,
        id_denuncia: 1,
        id_usuario: 1,
      },
      {
        descricao: 'Registro de acompanhamento da vistoria realizada pela equipe técnica.',
        data_publicacao: new Date('2025-10-26T14:00:00Z'),
        tipo: 2,
        id_denuncia: 1,
        id_usuario: 2,
      },
      {
        descricao: 'Registro de encerramento do caso após reparo finalizado com sucesso.',
        data_publicacao: new Date('2025-10-27T09:45:00Z'),
        tipo: 3,
        id_denuncia: 2,
        id_usuario: 2,
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('registro', null, {});
  }
};
