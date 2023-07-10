import { QueryInterface } from 'sequelize';

module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.bulkInsert('Category', [
      {
        id: 1,
        name: 'Entertainment',
        description: 'Activities and events for leisure and entertainment',
        icon: 'theater_comedy',
        color: '#6B8E23',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        name: 'Supermarket',
        description: 'Supermarket and grocery shopping',
        icon: 'shopping_cart',
        color: '#FF8C00',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 3,
        name: 'Travel',
        description: 'Travel and transportation',
        icon: 'flight',
        color: '#DC143C',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 4,
        name: 'Other',
        description: 'Other transactions',
        icon: 'category',
        color: '#696969',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete('Category', null, {});
  },
};
