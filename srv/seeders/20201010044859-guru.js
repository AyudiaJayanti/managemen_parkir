'use strict';
const faker = require('faker');

const gurus = [...Array(10)].map((guru) => (
  {
    nip           : faker.random.number({max: 196410101989000000, min: 196410101988000000}),
    nama          : faker.name.findName(),        
    createdAt     : new Date()
  }
))

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('gurus', gurus, {});
  },
  
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('gurus', null, {});
  }
};
