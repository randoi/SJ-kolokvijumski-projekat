'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Business_Classes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      seat_number: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      tv: {
        type: Sequelize.ENUM,
        values:['Yes','No'],
        allowNull: false
      },
      bed: {
        type: Sequelize.ENUM,
        values:['Yes','No'],
        allowNull: false
      },
      massage: {
        type: Sequelize.ENUM,
        values:['Yes','No'],
        allowNull: false
      },
      console_for_games: {
        type: Sequelize.STRING,
        allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      flightId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Business_Classes');
  }
};