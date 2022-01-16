'use strict';
const {
  Model
} = require('sequelize');
const business_class = require('./business_class');
const economy_class = require('./economy_class');
const middle_class = require('./middle_class');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Business_Class,Middle_Class,Economy_Class}) {
      // define association here
      this.hasOne(Business_Class,{
        foreignKey:{
          name: 'userId',
          as: 'bc',
          allowNull: false
        },
        onUpdate:'cascade',
        onDelete:'cascade',
        hooks: true
      }),
      this.hasOne(Middle_Class,{
        foreignKey:{
          name: 'userId',
          as: 'mc',
          allowNull: false
        },
        onUpdate:'cascade',
        onDelete:'cascade',
        hooks: true
      }),
      this.hasOne(Economy_Class,{
        foreignKey:{
          name: 'userId',
          as: 'ec',
          allowNull: false
        },
        onUpdate:'cascade',
        onDelete:'cascade',
        hooks: true
      })
    }
  };
  User.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    gender: {
      type: DataTypes.ENUM,
      values:['Male','Female']
    },
    address: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: {
      type: DataTypes.ENUM,
      values:['Admin','Moderator']
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};