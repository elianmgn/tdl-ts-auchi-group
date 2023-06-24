import React from 'react';
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
      <CategoryForm open={open} handleClose={handleClose}/>
      <CategoryList />
      <Fab variant="extended" onClick={handleOpen}>
        <ReceiptLongIcon sx={{ mr: 1 }} />
        Add
      </Fab >
    </div>
  );
}