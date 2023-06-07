import { hashSync } from 'bcryptjs';
import { QueryInterface } from 'sequelize';

module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.bulkInsert('User', [
      {
        email: 'admin@budgetify@gmail.com',
        username: 'admin',
        password: hashSync('admin'),
      },
    ]);
  },
  down: (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete('User', {});
  },
};
