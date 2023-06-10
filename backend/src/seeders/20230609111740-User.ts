import { QueryInterface } from 'sequelize';

module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.bulkInsert('User', [
      {
        first_name: 'Admin',
        last_name: 'User',
        email: 'admin@budgetify.com',
        username: 'admin',
        password: 'admin',
      },
    ]);
  },
  down: (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete('User', {});
  },
};
