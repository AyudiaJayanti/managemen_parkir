'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tamu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Tamu.hasMany(models.parkir, {foreignKey: 'visitor_id', as: 'parkirs'})
    }
  };
  Tamu.init({
    nama: DataTypes.STRING,
    instansi: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tamu',
  });
  return Tamu;
};