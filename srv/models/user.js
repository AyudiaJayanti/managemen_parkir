'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    
    static associate(models) {
      
    }
  };
  User.init({
    id: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,         
  }, {
    sequelize,
    modelName: 'user',
  });
  return User;
};