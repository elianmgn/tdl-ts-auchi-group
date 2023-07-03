import React from 'react';
import { AppBar, TextField, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import './CategoryListHeader.css';

interface ComponentProps {
  filters: Record<string, string>;
  handleFilterChange: (filterName: string, value: string | null) => void;
  handleOpen: () => void;
}

function CategoryListHeader({ filters, handleFilterChange, handleOpen }: ComponentProps) {
  return (
    <AppBar position="static" style={{ background: '#f5f5f5' }}>
      <div className="header-container">
        {/* Controles de filtrado */}
        <div className="filter-container">
          {/* Name */}
          <TextField
            style={{ width: '250px' }}
            variant="standard"
            label="Name"
            value={filters.name}
            onChange={(event) => handleFilterChange('name', event.target.value)}
          />

          {/* Date */}
          <TextField
            variant="standard"
            label="From"
            type="date"
            value={filters.dateFrom}
            onChange={(event) => handleFilterChange('dateFrom', event.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            variant="standard"
            label="To"
            type="date"
            value={filters.dateTo}
            onChange={(event) => handleFilterChange('dateTo', event.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>

        {/* Botón de agregar */}
        <div className="add-button-container">
          <Button variant="contained" onClick={handleOpen} startIcon={<AddIcon />}>
            ADD
          </Button>
        </div>
        {/* </Toolbar> */}
      </div>
    </AppBar>
  );
}

export default CategoryListHeader;
