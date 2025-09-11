"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("usuario", [
      {
        id_usuario: 1,
        nome_usuario: "Davy Oliveira Ribeiro",
        telefone: "(19) 99655-3967",
        email: "davy@gmail.com",
        senha: "$2b$10$LOQRWSEjJk0m0/EwRzgIGulqHgp2JP6pnQU87j3VV7xC11Oz8YwSu",
        cpf: "48739498824",
        endereco: "Rua Rachid Elias Zakia, Campinas, SP",
        nivel: 1,
      },
      {
        id_usuario: 2,
        nome_usuario: "Math Augusto Gueff",
        telefone: "(19) 99655-3967",
        email: "math@gmail.com",
        senha: "$2b$10$6nontGwjMnAdRyTuEvVpsu7Y4C3QcPBZnJ4/vaZNt9rsVW3m15vra",
        cpf: "37491871852",
        endereco: "Praça Bom Jesus, 334, Jundiaí, SP",
        nivel: 1,
      },
      {
        id_usuario: 3,
        nome_usuario: "Ryan Carlo Pereira",
        telefone: "(19) 99474-0505",
        email: "ryan@gmail.com",
        senha: "$2b$10$WDwdCzFIYF4aBXIIvGfSnOMwSiuvdkTT/x8wimLLnPGNbJ6mDbnuK",
        cpf: "19353433860",
        endereco: "Rua Henrique Dias, 387, Paulínia, SP",
        nivel: 1,
      },
      {
        id_usuario: 4,
        nome_usuario: "Pedro Martins",
        telefone: "(19) 99474-0505",
        email: "pedro@gmail.com",
        senha: "$2b$10$NG.x/4SMYP.o7WjVAeTB2eA55RguGVFRuWGYoi8huF4UxZxiQSZWm",
        cpf: "58993165866",
        endereco: "Rua Henrique Dias, 387, Paulínia, SP",
        nivel: 1,
      },
      {
        id_usuario: 5,
        nome_usuario: "Matheus Nery",
        telefone: "(11) 2770-0265",
        email: "nery@gmail.com",
        senha: "$2b$10$m0NAZ4jKqJ7tBRdyFOKoqeoNmB3346VcPW0GjqJMjwQCgIIwumW8K",
        cpf: "14277895840",
        endereco: "Rua Horácio Scrosoppi, 282, São Paulo, SP",
        nivel: 1,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("usuario", null, {});
  },
};
