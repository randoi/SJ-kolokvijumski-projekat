'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Middle_Classes', {
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
      internet: {
        type: Sequelize.ENUM,
        values:['Yes','No'],
        allowNull: false
      },
      pet: {
        type: Sequelize.ENUM,
        values:['Yes','No'],
        allowNull: false
      },
      transport_from_to_airport: {
        type: Sequelize.ENUM,
        values:['Yes','No'],
        allowNull: false
      },
      movie_to_watch: {
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
    await queryInterface.dropTable('Middle_Classes');
  }
};