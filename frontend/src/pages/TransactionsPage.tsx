import React from 'react';
import { Fab } from '@mui/material';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import TransactionList from '../components/TransactionForm/TransactionList';

import TransactionForm from '../components/TransactionForm/TransactionForm';

export default function TransactionsPage() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <TransactionForm open={open} handleClose={handleClose}/>
      <TransactionList />
      <Fab variant="extended" onClick={handleOpen}>
        <ReceiptLongIcon sx={{ mr: 1 }} />
        Add
      </Fab>
    </div>
  );
}
