'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Deleta a tabela se existir
    await queryInterface.dropTable('Usuarios');

    // Cria a nova tabela
    await queryInterface.createTable('Usuarios', {
      id_usuario: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      nome_usuario: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      telefone: {
        type: Sequelize.STRING(14),
        allowNull: true
      },
      email: {
        type: Sequelize.STRING(40),
        allowNull: false,
        unique: true
      },
      senha: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      cpf: {
        type: Sequelize.CHAR(11),
        allowNull: true,
        unique: true
      },
      endereco: {
        type: Sequelize.JSON,
        allowNull: true
      },
      nivel: {
        type: Sequelize.ENUM('common', 'admin'),
        allowNull: false,
        defaultValue: 'common'
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Deleta a tabela novamente
    await queryInterface.dropTable('Usuarios');

    // Remove o ENUM, importante para PostgreSQL
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS enum_Usuarios_nivel;');
  }
};
