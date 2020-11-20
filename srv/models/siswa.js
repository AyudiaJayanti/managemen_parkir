'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Siswa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Siswa.hasMany(models.parkir, {foreignKey: 'visitor_id', as: 'parkirs'})
      Siswa.hasMany(models.kendaraan, {foreignKey: 'owner_id', as: 'kendaraans'})
    }
  };
  Siswa.init({
    nis: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true
    },
    nama: DataTypes.STRING,
    // token: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'siswa',
  });
  return Siswa;
};