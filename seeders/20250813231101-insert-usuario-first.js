"use strict";

/** @type {import('sequelize-cli').Migration} */

export async function up(queryInterface, Sequelize) {
  const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkInsert("usuario", [
        {
          nome: "Davy Oliveira Ribeiro",
          email: "davy@gmail.com",
          senha: "$2a$10$RMIym22KCGvh9mbnPdIlIeWgJQ6Fj6V2oky.34thbDRXOjGNHhHaO",
          tipo: "funcionario",
          verified: true,
        },
        {
          nome: "Matheus Gueff",
          email: "gueff@gmail.com",
          senha: "$2a$10$RMIym22KCGvh9mbnPdIlIeWgJQ6Fj6V2oky.34thbDRXOjGNHhHaO",
          tipo: "funcionario",
          verified: true,
        },
        {
          nome: "Ryan Carlo Pereira",
          email: "ryan@gmail.com",
          senha: "$2a$10$RMIym22KCGvh9mbnPdIlIeWgJQ6Fj6V2oky.34thbDRXOjGNHhHaO",
          tipo: "funcionario",
          verified: true,
        },
        {
          nome: "Pedro Martins",
          email: "pedro@gmail.com",
          senha: "$2a$10$RMIym22KCGvh9mbnPdIlIeWgJQ6Fj6V2oky.34thbDRXOjGNHhHaO",
          tipo: "cidadao",
          verified: true,
        },
        {
          nome: "Matheus Nery",
          email: "nery@gmail.com",
          senha: "$2a$10$RMIym22KCGvh9mbnPdIlIeWgJQ6Fj6V2oky.34thbDRXOjGNHhHaO",
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

}
