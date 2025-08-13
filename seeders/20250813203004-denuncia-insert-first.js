"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("denuncia", [
      {
        titulo: "Falta de abastecimento de água",
        descricao: "Há três dias o bairro está sem água, afetando diversas famílias. A situação está insustentável, pois as pessoas não conseguem realizar atividades básicas como cozinhar, tomar banho ou lavar roupas. Entramos em contato com a companhia de saneamento, mas até agora não houve retorno sobre o motivo da interrupção ou previsão de normalização.",
        data: "2024-11-28",
        status: 0,
        cep: "18050600",
        cidade: "Sorocaba",
        bairro: "Jardim Guarujá",
        rua: "Rua Comandador Vicente do Amaral",
        numero: "334",
        complemento: "casa 27",
        pontuacao: 300,
        id_usuario: 1,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
