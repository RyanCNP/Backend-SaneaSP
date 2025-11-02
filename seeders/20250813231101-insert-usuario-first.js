"use strict";

/** @type {import('sequelize-cli').Migration} */

export async function up(queryInterface, Sequelize) {
  const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkInsert("usuario", [
        {
          id: 1,
          nome: "Davy Oliveira Ribeiro",
          email: "davy@gmail.com",
          senha: "$2b$10$LOQRWSEjJk0m0/EwRzgIGulqHgp2JP6pnQU87j3VV7xC11Oz8YwSu",
          tipo: "cidadao",
          verified: true,
        },
        {
          id: 2,
          nome: "Math Augusto Gueff",
          email: "math@gmail.com",
          senha: "$2b$10$6nontGwjMnAdRyTuEvVpsu7Y4C3QcPBZnJ4/vaZNt9rsVW3m15vra",
          tipo: "cidadao",
          verified: true,
        },
        {
          id: 3,
          nome: "Ryan Carlo Pereira",
          email: "ryan@gmail.com",
          senha: "$2b$10$WDwdCzFIYF4aBXIIvGfSnOMwSiuvdkTT/x8wimLLnPGNbJ6mDbnuK",
          tipo: "cidadao",
          verified: true,
        },
        {
          id: 4,
          nome: "Pedro Martins",
          email: "pedro@gmail.com",
          senha: "$2b$10$NG.x/4SMYP.o7WjVAeTB2eA55RguGVFRuWGYoi8huF4UxZxiQSZWm",
          tipo: "cidadao",
          verified: true,
        },
        {
          id: 5,
          nome: "Matheus Nery",
          email: "nery@gmail.com",
          senha: "$2b$10$m0NAZ4jKqJ7tBRdyFOKoqeoNmB3346VcPW0GjqJMjwQCgIIwumW8K",
          tipo: "cidadao",
          verified: true,
        }
      ]);
      await transaction.commit();
    } catch (error) {
       await transaction.rollback();
      console.log('Erro na seed INSERT-USUARIO - rollback realizado:', error.errors || error.message);
      throw error;
    }
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete("usuario", null, {});
  await queryInterface.sequelize.query(
    "DELETE FROM sqlite_sequence WHERE name='usuario';"
  );
}
