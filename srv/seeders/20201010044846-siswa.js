'use strict';
const faker = require('faker');

const siswas = [...Array(10)].map((siswa) => (
  {
    nis           : faker.random.number({ min: 181113000, max: 190000000}),
    nama          : faker.name.findName(),       
    createdAt     : new Date()
  }
))

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Siswas', siswas, {});
  },
  
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Siswas', null, {});
  }
};
