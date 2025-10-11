"use strict";

/** @type {import('sequelize-cli').Migration} */

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert("usuario", [{
    id: 1,
    nome: "Davy Oliveira Ribeiro",
    telefone: "(19) 99655-3967",
    email: "davy@gmail.com",
    senha: "$2b$10$LOQRWSEjJk0m0/EwRzgIGulqHgp2JP6pnQU87j3VV7xC11Oz8YwSu",
    cpf: "48739498824",
    rua: "Rua Horácio Scrosoppi",
    numero: "282",
    bairro: "Ipiranga",
    cidade: "São Paulo",
    cep: "04275-020",
    nivel: 1,
    verified: true,
  },
    {
      id: 2,
      nome: "Math Augusto Gueff",
      telefone: "(19) 99655-3967",
      email: "math@gmail.com",
      senha: "$2b$10$6nontGwjMnAdRyTuEvVpsu7Y4C3QcPBZnJ4/vaZNt9rsVW3m15vra",
      cpf: "37491871852",
      rua: "Rua Henrique Dias",
      numero: "387",
      bairro: "Centro",
      cidade: "Paulínia",
      cep: "13140-140",
      nivel: 1,
      verified: true,
    },
    {
      id: 3,
      nome: "Ryan Carlo Pereira",
      telefone: "(19) 99474-0505",
      email: "ryan@gmail.com",
      senha: "$2b$10$WDwdCzFIYF4aBXIIvGfSnOMwSiuvdkTT/x8wimLLnPGNbJ6mDbnuK",
      cpf: "19353433860",
      rua: "Praça Bom Jesus",
      numero: "334",
      bairro: "Vila Arens",
      cidade: "Jundiaí",
      cep: "13202-002",
      nivel: 1,
      verified: true,
    },
    {
      id: 4,
      nome: "Pedro Martins",
      telefone: "(19) 99474-0505",
      email: "pedro@gmail.com",
      senha: "$2b$10$NG.x/4SMYP.o7WjVAeTB2eA55RguGVFRuWGYoi8huF4UxZxiQSZWm",
      cpf: "58993165866",
      rua: "Praça Bom Jesus",
      numero: "334",
      bairro: "Vila Arens",
      cidade: "Jundiaí",
      cep: "13202-002",
      nivel: 1,
      verified: true,
    },
    {
      id: 5,
      nome: "Matheus Nery",
      telefone: "(11) 2770-0265",
      email: "nery@gmail.com",
      senha: "$2b$10$m0NAZ4jKqJ7tBRdyFOKoqeoNmB3346VcPW0GjqJMjwQCgIIwumW8K",
      cpf: "14277895840",
      rua: "Rua Rachid Elias Zakia",
      bairro: "Chácara Primavera",
      cidade: "Campinas",
      cep: "13087-540",
      nivel: 1,
      verified: true,
    }]);
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete("usuario", null, {});
  await queryInterface.sequelize.query(
      "DELETE FROM sqlite_sequence WHERE name='usuario';"
    );
}
