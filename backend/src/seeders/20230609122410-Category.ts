import { QueryInterface } from 'sequelize';

module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.bulkInsert('Category', [
      {
        id: 1,
        name: 'Entertainment',
        description: 'Activities and events for leisure and entertainment',
        icon: 'theater_comedy',
        color: 'oliveDrab',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        name: 'Supermarket',
        description: 'Supermarket and grocery shopping',
        icon: 'shopping_cart',
        color: 'darkOrange',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 3,
        name: 'Travel',
        description: 'Travel and transportation',
        icon: 'flight',
        color: 'salmon',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 4,
        name: 'Other',
        description: 'Other transactions',
        icon: 'category',
        color: 'dimGray',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete('Category', null, {});
  },
};
