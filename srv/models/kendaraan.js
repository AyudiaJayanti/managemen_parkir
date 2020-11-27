'use strict';
const {
  Model
} = require('sequelize');
const guru = require('./guru');
module.exports = (sequelize, DataTypes) => {
  class Kendaraan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Kendaraan.belongsTo(models.siswa, {foreignKey: 'owner_id', as: 'siswa'})
      Kendaraan.belongsTo(models.guru, {foreignKey: 'owner_id', as: 'guru'})
    }
  };
  Kendaraan.init({
    owner_id: DataTypes.STRING,
    no_sim: DataTypes.STRING,
    no_stnk: DataTypes.STRING,
    jenis: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'kendaraan',
  });
  return Kendaraan;
};