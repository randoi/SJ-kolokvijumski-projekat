'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Economy_Class extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User,Flight}) {
      // define association here
      this.belongsTo(User, {foreignKey: 'userId', as: 'user'})
      this.belongsTo(Flight, {foreignKey: 'flightId', as: 'flight'})
    }
  };
  Economy_Class.init({
    seat_number: DataTypes.INTEGER,
    meal: {
      type: DataTypes.ENUM,
      values:['Yes','No']
    },
    drink: {
      type: DataTypes.ENUM,
      values:['Yes','No']
    },
    handbag: {
      type: DataTypes.ENUM,
      values:['Yes','No']
    },
    special_needs: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Economy_Class',
  });
  return Economy_Class;
};