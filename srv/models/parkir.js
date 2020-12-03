'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Parkir extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Parkir.belongsTo(models.siswa, {foreignKey: 'visitor_id', as: 'siswa'})
      Parkir.belongsTo(models.guru, {foreignKey: 'visitor_id', as: 'guru'})
      Parkir.belongsTo(models.tamu, {foreignKey: 'visitor_id', as: 'tamu'})
    }
  };
  Parkir.init({
    id: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    visitor_id: DataTypes.STRING,
    // token: DataTypes.STRING,
    // status: DataTypes.STRING,
    role: {
      type: Sequelize.ENUM,
      values: ['1', '2', '3']
    },    
    masuk: DataTypes.DATE,
    keluar: DataTypes.DATE,  
  }, {
    sequelize,
    modelName: 'parkir',
  });
  return Parkir;
};