'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // Função UP: O que acontece quando a migration é aplicada (cria a tabela)
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('visitas', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
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
      fk_registro: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // Configurando a Chave Estrangeira (Foreign Key) para a tabela 'registros'
        references: {
          model: 'registros', // Nome da tabela que possui a chave primária
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      // Como seu modelo está com timestamps: false, eu não incluí 'createdAt' e 'updatedAt'.
      // Se você decidir ativá-los, adicione-os aqui.
    }, {
        // Seus modelos usam o nome 'visitas', então a tabela será 'visitas'.
        tableName: 'visitas',
        timestamps: false,
    });
  },

  // Função DOWN: O que acontece quando a migration é revertida (apaga a tabela)
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('visitas');
  }
};