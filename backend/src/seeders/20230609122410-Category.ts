import { QueryInterface } from 'sequelize';

module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.bulkInsert('Category', [
      {
        id: 1,
        name: 'Entertainment',
        description: 'Activities and events for leisure and entertainment',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete('Category', null, {});
  },
};
