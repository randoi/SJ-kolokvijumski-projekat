'use strict';
const {
  Model
} = require('sequelize');
const user = require('./user');
module.exports = (sequelize, DataTypes) => {
  class Middle_Class extends Model {
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
  Middle_Class.init({
    seat_number: DataTypes.INTEGER,
    internet: {
      type: DataTypes.ENUM,
      values:['Yes','No']
    },
    pet: {
      type: DataTypes.ENUM,
      values:['Yes','No']
    },
    transport_from_to_airport: {
      type: DataTypes.ENUM,
      values:['Yes','No']
    },
    movie_to_watch: DataTypes.STRING,

  }, {
    sequelize,
    modelName: 'Middle_Class',
  });
  return Middle_Class;
};