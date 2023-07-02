import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { Fab } from '@mui/material';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import CategoryList from '../components/CategoryForm/CategoryList';

import CategoryForm from '../components/CategoryForm/CategoryForm';

export default function CategoriesPage() {
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
              CATEGORÍAS
            </Typography>
          </Grid>
          <Grid item style={{ marginRight: '70px' }}>
            <Fab variant="extended" onClick={handleOpen}>
              <ReceiptLongIcon sx={{ mr: 1 }} />
              Add
            </Fab>
          </Grid>
        </Grid>
      </div>

      <CategoryForm open={open} handleClose={handleClose}/>
      <CategoryList />
    </div>
  );
}