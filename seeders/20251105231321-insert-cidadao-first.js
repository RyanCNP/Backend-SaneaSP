'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('cidadao', [
      {
        id_usuario: 1,
        cep: '18074719',
        cidade: 'Sorocaba',
        bairro: 'Jd. Simus',
        rua: 'Rua das Flores',
        numero: '123',
        complemento: 'Apto 1',
        cpf: '12345678901',
        telefone: '15999999999'
      },
      {
        id_usuario: 2,
        cep: '18000000',
        cidade: 'Sorocaba',
        bairro: 'Centro',
        rua: 'Av. Central',
        numero: '456',
        complemento: null,
        cpf: '23456789012',
        telefone: '15988888888'
      },
      {
        id_usuario: 3,
        cep: '18100000',
        cidade: 'Votorantim',
        bairro: 'Bairro Alto',
        rua: 'Rua do Sol',
        numero: '789',
        complemento: 'Casa',
        cpf: '34567890123',
        telefone: '15987777777'
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('cidadao', {
      id_usuario: { [Sequelize.Op.in]: [1, 2, 3, 4, 5] }
    }, {});
  }
};
