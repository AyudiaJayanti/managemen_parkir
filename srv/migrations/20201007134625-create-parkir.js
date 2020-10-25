'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Parkirs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      visitor_id: {
        allowNull: false,
        type: Sequelize.STRING
      },

      // token: {
      //   type: Sequelize.STRING
      // },
      // status:{
      //   type: Sequelize.ENUM,
      //   values: ['1', '0']
      // },

      role: {
        type: Sequelize.ENUM,
        values: ['1', '2', '3']
      },    
      masuk: {
        type: Sequelize.DATE
      },
      keluar: {
        allowNull: true,
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Parkirs');
  }
};