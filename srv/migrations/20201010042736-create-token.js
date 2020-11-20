'use strict';
module.exports = {
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('tokens');
  }
};