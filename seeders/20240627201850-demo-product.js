'use strict';

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
      'Impressora'
    ];
    const products = [];

    for (let i = 1; i <= 100; i++) {
      const category = categories[i % categories.length];
      products.push({
        id: Sequelize.fn('UUID'),
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
