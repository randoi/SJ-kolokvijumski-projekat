'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Business_Class extends Model {
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
  Business_Class.init({
    seat_number: DataTypes.INTEGER,
    tv: {
      type: DataTypes.ENUM,
      values:['Yes','No']
    },
    bed: {
      type: DataTypes.ENUM,
      values:['Yes','No']
    },
    massage: {
      type: DataTypes.ENUM,
      values:['Yes','No']
    },
    console_for_games: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Business_Class',
  });
  return Business_Class;
};