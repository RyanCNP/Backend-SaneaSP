'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categoria', [
      {
        nome: "Falta de abastecimento",
      },
      {
        nome: "Água imprópria",
      },
      {
        nome: "Vazamento de água",
      },
      {
        nome: "Esgoto a céu aberto",
      },
      {
        nome: "Vazamento de rede de esgoto",
      },
      {
        nome: "Ligação irregular de esgoto",
      },
      {
        nome: "Boca de lobo entupida",
      },
      {
        nome: "Alagamento",
      },
      {
        nome: "Valas abertas",
      },
      {
        nome: "Coleta de lixo doméstico",
      },
      {
        nome: "Limpeza de vias e espaços públicos",
      },
      {
        nome: "Remoção de entulho ou grandes objetos",
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categoria', null, {});
  }
};