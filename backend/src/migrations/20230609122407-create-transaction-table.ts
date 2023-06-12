import { QueryInterface } from 'sequelize';
module.exports = {
  up: (queryInterface: QueryInterface, Sequelize: any) => {
    return queryInterface.createTable('Transaction', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        references: { model: 'User', key: 'id' },
        type: Sequelize.INTEGER,
        field: 'user_id',
      },
      description: {
        type: Sequelize.STRING,
      },
      category: {
        type: Sequelize.STRING,
      },
      amount: {
        type: Sequelize.INTEGER,
      },
      date: {
        type: Sequelize.DATE,
      },
      type: {
        type: Sequelize.ENUM('INCOME', 'EXPENSE'),
      },
      payment_method: {
        type: Sequelize.ENUM('CASH', 'CREDIT-CARD', 'TRANSFER', 'OTHER'),
      },
      createdAt: {
        type: Sequelize.DATE,
        field: 'created_at',
      },
      updatedAt: {
        type: Sequelize.DATE,
        field: 'updated_at',
      },
      deletedAt: {
        type: Sequelize.DATE,
        field: 'deleted_at',
      },
    });
  },
  down: (queryInterface: QueryInterface) => {
    // If migration fails, this will be called. Rollback your migration changes.
    return queryInterface.dropTable('Transaction');
  },
};
