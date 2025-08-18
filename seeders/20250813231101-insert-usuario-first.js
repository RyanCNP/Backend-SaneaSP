'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('usuario', [
      {
        id_usuario: 1,
        nome_usuario: "Davy Ribeiro",
        telefone: "(15) 99138-4343",
        email: "davy@gmail.com",
        senha: "Mudar@123",
        cpf: "47251787806",
        endereco: "Rua Comendador Vicente do Amaral",
        nivel: 0
      }
    ]
  );

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('usuario', null, {});
     
  }
};
