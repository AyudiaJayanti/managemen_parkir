'use strict';
const faker = require('faker');

const jwt = require('jsonwebtoken');
var i = 181113800;

const tokens = [...Array(30)].map((token) => (  
  {    
    token         : jwt.sign({ id: i+=5, role: 'parkir' }, 'secret_key'),
    expired       : new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
    createdAt     : new Date()
  }
))

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('tokens', tokens, {});
  },
  
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('tokens', null, {});
  }
};
