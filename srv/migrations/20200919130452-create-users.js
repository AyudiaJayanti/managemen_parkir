'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        allowNull: true,
        type: Sequelize.STRING(50)
      },
      password: {
        allowNull: true,
        type: Sequelize.STRING(50)
      },      
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};