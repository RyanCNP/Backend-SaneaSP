'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkInsert('grupo_categoria', [
        {
          nome : "Água",
          icone: "water.png"
        },
        {
          nome : "Drenagem",
          icone: "drainage.png"
        },
        {
          nome : "Esgoto",
          icone: "sewage.png"
        },
        {
          nome : "Limpeza",
          icone: "cleaning.png"
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
  }
};
