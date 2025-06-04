'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Usuarios', 'nivel', {type: DataTypes.INTEGER, allowNull: true});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Usuarios', 'nivel');
  }
};
