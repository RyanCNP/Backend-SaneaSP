'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
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
      ], transaction)
      await transaction.commit();
    } catch (error) {
       await transaction.rollback();
      console.log('Erro na seed INSERT-GRUPO-CATEGORIA - rollback realizado:', error.errors || error.message);
      throw error;
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('grupo_categoria', null, {});
    await queryInterface.sequelize.query(
      "DELETE FROM sqlite_sequence WHERE name='grupo_categoria';"
    );
  }
};
