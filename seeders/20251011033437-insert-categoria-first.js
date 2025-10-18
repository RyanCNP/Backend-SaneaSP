'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkInsert('categoria_denuncia', [
        // Denúncia 1 - 2 categorias
        { id_denuncia: 1, id_categoria: 1 },
        { id_denuncia: 1, id_categoria: 2 },

        // Denúncia 2 - 1 categoria
        { id_denuncia: 2, id_categoria: 3 },

        // Denúncia 3 - 3 categorias
        { id_denuncia: 3, id_categoria: 4 },
        { id_denuncia: 3, id_categoria: 5 },
        { id_denuncia: 3, id_categoria: 6 },

        // Denúncia 4 - 1 categoria
        { id_denuncia: 4, id_categoria: 7 },

        // Denúncia 5 - 2 categorias
        { id_denuncia: 5, id_categoria: 8 },
        { id_denuncia: 5, id_categoria: 9 },

        // Denúncia 6 - 1 categoria
        { id_denuncia: 6, id_categoria: 10 },

        // Denúncia 7 - 2 categorias
        { id_denuncia: 7, id_categoria: 11 },
        { id_denuncia: 7, id_categoria: 12 },

        // Denúncia 8 - 1 categoria
        { id_denuncia: 8, id_categoria: 1 },

        // Denúncia 9 - 3 categorias
        { id_denuncia: 9, id_categoria: 4 },
        { id_denuncia: 9, id_categoria: 3 },
        { id_denuncia: 9, id_categoria: 1 },

        // Denúncia 10 - 1 categoria
        { id_denuncia: 10, id_categoria: 1 },

        // Denúncia 11 - 2 categorias
        { id_denuncia: 11, id_categoria: 2 },
        { id_denuncia: 11, id_categoria: 3 },

        // Denúncia 12 - 1 categoria
        { id_denuncia: 12, id_categoria: 4 },

        // Denúncia 13 - 2 categorias
        { id_denuncia: 13, id_categoria: 5 },
        { id_denuncia: 13, id_categoria: 6 },

        // Denúncia 14 - 1 categoria
        { id_denuncia: 14, id_categoria: 7 },

        // Denúncia 15 - 3 categorias
        { id_denuncia: 15, id_categoria: 8 },
        { id_denuncia: 15, id_categoria: 9 },
        { id_denuncia: 15, id_categoria: 10 },

        // Denúncia 16 - 1 categoria
        { id_denuncia: 16, id_categoria: 11 },

        // Denúncia 17 - 2 categorias
        { id_denuncia: 17, id_categoria: 12 },
        { id_denuncia: 17, id_categoria: 3 },

        // Denúncia 18 - 1 categoria
        { id_denuncia: 18, id_categoria: 4 },

        // Denúncia 19 - 2 categorias
        { id_denuncia: 19, id_categoria: 5 },
        { id_denuncia: 19, id_categoria: 6 },

        // Denúncia 20 - 1 categoria
        { id_denuncia: 20, id_categoria: 1 },

        // Denúncia 21 - 2 categorias
        { id_denuncia: 21, id_categoria: 2 },
        { id_denuncia: 21, id_categoria: 3 },

        // Denúncia 22 - 1 categoria
        { id_denuncia: 22, id_categoria: 4 },

        // Denúncia 23 - 3 categorias
        { id_denuncia: 23, id_categoria: 5 },
        { id_denuncia: 23, id_categoria: 6 },
        { id_denuncia: 23, id_categoria: 7 },

        // Denúncia 24 - 1 categoria
        { id_denuncia: 24, id_categoria: 8 },

        // Denúncia 25 - 2 categorias
        { id_denuncia: 25, id_categoria: 9 },
        { id_denuncia: 25, id_categoria: 10 },

        // Denúncia 26 - 1 categoria
        { id_denuncia: 26, id_categoria: 11 },

        // Denúncia 27 - 2 categorias
        { id_denuncia: 27, id_categoria: 12 },
        { id_denuncia: 27, id_categoria: 3 },

        // Denúncia 28 - 1 categoria
        { id_denuncia: 28, id_categoria: 4 },

        // Denúncia 29 - 2 categorias
        { id_denuncia: 29, id_categoria: 5 },
        { id_denuncia: 29, id_categoria: 6 },

        // Denúncia 30 - 1 categoria
        { id_denuncia: 30, id_categoria: 1 },

        // Denúncia 31 - 2 categorias
        { id_denuncia: 31, id_categoria: 2 },
        { id_denuncia: 31, id_categoria: 3 },

        // Denúncia 32 - 1 categoria
        { id_denuncia: 32, id_categoria: 4 },

        // Denúncia 33 - 2 categorias
        { id_denuncia: 33, id_categoria: 5 },
        { id_denuncia: 33, id_categoria: 6 },

        // Denúncia 34 - 1 categoria
        { id_denuncia: 34, id_categoria: 7 },

        // Denúncia 35 - 2 categorias
        { id_denuncia: 35, id_categoria: 8 },
        { id_denuncia: 35, id_categoria: 9 },

        // Denúncia 36 - 1 categoria
        { id_denuncia: 36, id_categoria: 10 },

        // Denúncia 37 - 2 categorias
        { id_denuncia: 37, id_categoria: 11 },
        { id_denuncia: 37, id_categoria: 12 },

        // Denúncia 38 - 1 categoria
        { id_denuncia: 38, id_categoria: 3 },

        // Denúncia 39 - 3 categorias
        { id_denuncia: 39, id_categoria: 4 },
        { id_denuncia: 39, id_categoria: 5 },
        { id_denuncia: 39, id_categoria: 6 },

        // Denúncia 40 - 1 categoria
        { id_denuncia: 40, id_categoria: 1 },
      ], {});
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      console.log('Erro na seed INSERT-CATEGORIA - rollback realizado:', error.errors || error.message);
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categoria', null, {});
  }
};