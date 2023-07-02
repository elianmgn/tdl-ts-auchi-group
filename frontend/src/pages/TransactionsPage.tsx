import React from 'react';

import { Grid, Typography } from '@material-ui/core';

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
      <div style={{ marginTop: '35px', marginLeft: '20px', marginBottom: '10px' }}>
        <Grid container alignItems="center" justifyContent="space-between" spacing={2}>
          <Grid item>
            <Typography variant="h4" component="h1" style={{ fontWeight: 'bold', color: 'darkblue' }}>
              TRANSACCIONES
            </Typography>
          </Grid>
          <Grid item style={{ marginRight: '140px' }}>
            <Fab variant="extended" onClick={handleOpen}>
              <ReceiptLongIcon sx={{ mr: 1 }} />
              Add
            </Fab>
          </Grid>
        </Grid>
      </div>

      <TransactionForm open={open} handleClose={handleClose}/>
      <TransactionList />
    </div>
  );
}
