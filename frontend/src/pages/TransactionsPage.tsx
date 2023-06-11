import React from 'react';
import { Fab } from '@mui/material';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import TransactionList from '../components/TransactionForm/TransactionList';

export default function TransactionsPage() {
  return (
    <div>
      <TransactionList />
      <Fab variant="extended" href="transactions/form">
        <ReceiptLongIcon sx={{ mr: 1 }} />
        Add
      </Fab >
    </div>
  );
}
