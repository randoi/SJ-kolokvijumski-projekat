'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Economy_Classes', {
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
      meal: {
        type: Sequelize.ENUM,
        values:['Yes','No'],
        allowNull: false
      },
      drink: {
        type: Sequelize.ENUM,
        values:['Yes','No'],
        allowNull: false
      },
      handbag: {
        type: Sequelize.ENUM,
        values:['Yes','No'],
        allowNull: false
      },
      special_needs: {
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
    await queryInterface.dropTable('Economy_Classes');
  }
};