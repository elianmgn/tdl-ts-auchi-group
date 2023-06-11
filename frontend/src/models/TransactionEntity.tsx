type TransactionEntity = {
  id?: number; // Transaction ID
  user?: number; // User ID
  description: string; // A brief description of the transaction.
  category: string; // Category of transaction (Supermarket | Subscription | Rent | Salary | Gift | Transfer | Education | Health | Shopping | Bills | Entertainment | Transportation | Pets | Home | Sport | Utilities | Electronics | Insurance | Car | Friends | Taxes | Other)
  amount: number; // Amount of transaction
  date: string; // Date of transaction. Format: YYYY-MM-DD
  type: string; // Type of transaction (Income | Expense)
  payment_method: string; // Payment method (Cash | Credit Card | Debit Card | Check | Other)
};

export default TransactionEntity;