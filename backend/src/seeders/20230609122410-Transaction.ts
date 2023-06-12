import { QueryInterface } from 'sequelize';
module.exports = {
  up: (queryInterface: QueryInterface) => {
    // Write seeder code here.
    return queryInterface.bulkInsert('Transaction', [
      {
        id: 1,
        user_id: 1,
        description: 'Entradas Taylor',
        category: 'ENTERTAINMENT',
        amount: 40000,
        date: new Date(),
        type: 'EXPENSE',
        payment_method: 'CASH',
      },
    ]);
  },
  down: (queryInterface: QueryInterface) => {
    // If seeder fails, this will be called. Rollback your seeder changes.
    return queryInterface.bulkDelete('Transaction', {});
  },
};
