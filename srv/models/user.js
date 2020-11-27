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
    email: {
      type: Sequelize.UUID,
      unique: true
    },
    password: {
      type: Sequelize.UUID,
      unique: true
    },
  }, {
    sequelize,
    modelName: 'user',
  });
  return User;
};