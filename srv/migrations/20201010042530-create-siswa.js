'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Siswas', {      
      nis: {
        primaryKey: true,
        type: Sequelize.STRING
      },
      nama: {
        type: Sequelize.STRING
      },
      // token: {
      //   allowNull: true,
      //   type: Sequelize.STRING
      // },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Siswas');
  }
};