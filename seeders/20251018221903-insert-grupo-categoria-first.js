'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('grupo_categoria', [
      {
        id: 1,
        nome : "Água",
        icone: "water.webp"
      },
      {
        id: 2,
        nome : "Drenagem",
        icone: "drainage.webp"
      },
      {
        id: 3,
        nome : "Esgoto",
        icone: "sewage.webp"
      },
      {
        id: 4,
        nome : "Limpeza",
        icone: "cleaning.webp"
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('grupo_categoria', null, {});
    await queryInterface.sequelize.query(
      "DELETE FROM sqlite_sequence WHERE name='grupo_categoria';"
    );
  }
};
