// migrations/[timestamp]-create-visitas-table.js

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Cria a tabela 'visitas'
    await queryInterface.createTable('visitas', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      motivo: {
        type: Sequelize.STRING(250),
        allowNull: false,
      },
      conclusao: {
        type: Sequelize.STRING(250),
        allowNull: true,
      },
      data_inicio: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      data_final: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      // CHAVE ESTRANGEIRA: fk_registro
      // fk_registro: {
      //   type: Sequelize.INTEGER, // Ajuste para o tipo da PK da sua tabela 'registros'
      //   allowNull: false,
      //   references: {
      //     model: 'registros', // Nome da tabela de Registro (assumindo que seja 'registros')
      //     key: 'id', // A chave primária da tabela 'registros'
      //   },
      //   onUpdate: 'CASCADE',
      //   onDelete: 'CASCADE',
      // },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('visitas');
  }
};