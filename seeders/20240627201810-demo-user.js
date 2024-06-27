'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash('Password123!', 10);
    const users = [];

    for (let i = 1; i <= 100; i++) {
      users.push({
        id: Sequelize.fn('UUID'),
        firstName: `User${ i }`,
        lastName: `Test${ i }`,
        email: `user${ i }@example.com`,
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    await queryInterface.bulkInsert('users', users, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
