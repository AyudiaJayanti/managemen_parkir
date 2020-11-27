'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Guru extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Guru.hasMany(models.parkir, {foreignKey: 'visitor_id', as: 'parkirs'})
      Guru.hasMany(models.kendaraan, {foreignKey: 'owner_id', as: 'kendaraans'})
    }
  };
  Guru.init({
    nip: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true
    },
    nama: DataTypes.STRING,
    // token: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'guru',
  });
  return Guru;
};