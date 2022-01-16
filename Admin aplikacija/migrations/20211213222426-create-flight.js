'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Flights', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      take_off_place: {
        type: Sequelize.STRING,
        allowNull: false
      },
      landing_place: {
        type: Sequelize.STRING,
        allowNull: false
      },
      number_of_passengers: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      take_off_time: {
        type: Sequelize.STRING,
        allowNull: false
      },
      landing_time: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('Flights');
  }
};