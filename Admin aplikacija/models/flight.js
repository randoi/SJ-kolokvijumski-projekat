'use strict';
const {
  Model
} = require('sequelize');
const business_class = require('./business_class');
module.exports = (sequelize, DataTypes) => {
  class Flight extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Business_Class,Middle_Class,Economy_Class}) {
      // define association here
      this.hasMany(Business_Class,{
        foreignKey:{
          name: 'flightId',
          as: 'bc',
          allowNull: false
        },
        onUpdate:'cascade',
        onDelete:'cascade',
        hooks: true
      }),
      this.hasMany(Middle_Class,{
        foreignKey:{
          name: 'flightId',
          as: 'mc',
          allowNull: false
        },
        onUpdate:'cascade',
        onDelete:'cascade',
        hooks: true
      }),
      this.hasMany(Economy_Class,{
        foreignKey:{
          name: 'flightId',
          as: 'ec',
          allowNull: false
        },
        onUpdate:'cascade',
        onDelete:'cascade',
        hooks: true
      })
    }
  };
  Flight.init({
    take_off_place: DataTypes.STRING,
    landing_place: DataTypes.STRING,
    number_of_passengers: DataTypes.INTEGER,
    take_off_time: DataTypes.STRING,
    landing_time: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Flight',
  });
  return Flight;
};