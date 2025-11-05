"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkInsert(
        "categoria",
        [
          {
            nome: "Falta de abastecimento",
            id_grupo: 1,
          },
          {
            nome: "Água imprópria",
            id_grupo: 1,
          },
          {
            nome: "Vazamento de água",
            id_grupo: 1,
          },
          {
            nome: "Esgoto a céu aberto",
            id_grupo: 2,
          },
          {
            nome: "Vazamento de rede de esgoto",
            id_grupo: 2,
          },
          {
            nome: "Ligação irregular de esgoto",
            id_grupo: 2,
          },
          {
            nome: "Boca de lobo entupida",
            id_grupo: 3,
          },
          {
            nome: "Alagamento",
            id_grupo: 3,
          },
          {
            nome: "Valas abertas",
            id_grupo: 3,
          },
          {
            nome: "Coleta de lixo doméstico",
            id_grupo: 4,
          },
          {
            nome: "Limpeza de vias e espaços públicos",
            id_grupo: 4,
          },
          {
            nome: "Remoção de entulho ou grandes objetos",
            id_grupo: 4,
          },
        ],
        {},
      );
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      console.log(
        "Erro na seed INSERT-CATEGORIA - rollback realizado:",
        error.errors || error.message,
      );
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("categoria", null, {});
  },
};
