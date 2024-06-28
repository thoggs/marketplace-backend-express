'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const categories = [
      'Tablet',
      'Smartphone',
      'Televisor',
      'Notebook',
      'Console de Jogos',
      'Câmera',
      'Headphone',
      'Smartwatch',
      'Monitor',
    ];
    const products = [];

    for (let i = 1; i <= 100; i++) {
      const category = categories[i % categories.length];
      products.push({
        id: uuidv4(),
        name: `Product ${ i }`,
        description: `Description for product ${ i }`,
        price: (Math.random() * 1000).toFixed(2),
        stock: Math.floor(Math.random() * 100) + 1,
        category: category,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    await queryInterface.bulkInsert('products', products, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('products', null, {});
  }
};