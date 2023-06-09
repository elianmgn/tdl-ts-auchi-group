import React from 'react';
import { Fab } from '@mui/material';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

export default function TransactionsPage() {
  return (
    <div>
      <h1>Transactions</h1>
      <Fab variant="extended" href="transactions/form">
        <ReceiptLongIcon sx={{ mr: 1 }} />
        Add
      </Fab>
    </div>
  );
}
