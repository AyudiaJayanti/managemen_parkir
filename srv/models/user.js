'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    
    static associate(models) {
      
    }
  };
  User.init({
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    gender: DataTypes.BOOLEAN,  
    // photo: DataTypes.BLOB
  }, {
    sequelize,
    modelName: 'user',
  });
  return User;
};