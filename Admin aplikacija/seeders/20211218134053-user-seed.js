'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
      await queryInterface.bulkInsert('Users', [{
        first_name: 'Radovan',
        last_name: 'Markovic',
        age: 21,
        gender: 'Male',
        address: 'Dula Karaklajic',
        phone_number: '069 707-427',
        username: 'Rasa',
        password: bcrypt.hashSync("12345678", 10),
        role: 'Admin',
        createdAt: new Date(),
        updatedAt: new Date()
      }]);
    
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
