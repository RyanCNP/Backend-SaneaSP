'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('visitas', [
      {
        id:1,
        data_inicio: new Date('2025-11-01T10:00:00Z'),
        data_final: new Date('2025-11-01T12:00:00Z'),
        fk_registro: 1
      },
      {
        id:2,
        data_inicio: new Date('2025-11-15T14:00:00Z'),
        data_final: new Date('2025-11-20T16:00:00Z'),
        fk_registro: 2
      },
      {
        id:3,
        data_inicio: new Date('2025-11-01T09:00:00Z'),
        data_final: new Date('2025-11-27T11:00:00Z'),
        fk_registro: 3
      }
  ]);
    
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('visitas', null, {});
  }
};
