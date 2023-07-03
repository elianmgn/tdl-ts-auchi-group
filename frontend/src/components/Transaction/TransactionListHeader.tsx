import React from 'react';
import {
  FormControl,
  MenuItem,
  AppBar,
  InputLabel,
  Select,
  TextField,
  Button,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import './TransactionListHeader.css';

interface ComponentProps {
  filters: Record<string, string>;
  handleFilterChange: (filterName: string, value: string | null) => void;
  handleOpen: () => void;
}

function TransactionListHeader({ filters, handleFilterChange, handleOpen }: ComponentProps) {
  return (
    <AppBar position="static" style={{ background: '#f5f5f5' }}>
      <div className="header-container">
        {/* Controles de filtrado */}
        <div className="filter-container">
          {/* Description */}
          <TextField
            style={{ width: '250px' }}
            variant="standard"
            label="Description"
            value={filters.description}
            onChange={(event) => handleFilterChange('description', event.target.value)}
          />
          {/* Type */}
          <FormControl variant="standard" style={{ width: '130px' }}>
            <InputLabel id="type-label">Type</InputLabel>
            <Select
              labelId="type-label"
              id="type-input"
              label="Type"
              defaultValue=""
              value={filters.type}
              onChange={(event) => handleFilterChange('type', event.target.value)}
            >
              <MenuItem value="ALL">All</MenuItem>
              <MenuItem value="INCOME">Income</MenuItem>
              <MenuItem value="EXPENSE">Expense</MenuItem>
            </Select>
          </FormControl>

          {/* Payment Method */}
          <FormControl variant="standard" style={{ width: '130px' }}>
            <InputLabel id="payment-label">Payment Method</InputLabel>
            <Select
              labelId="payment-label"
              id="payment-input"
              label="Payment Method"
              defaultValue=""
              value={filters.paymentMethod}
              onChange={(event) => handleFilterChange('paymentMethod', event.target.value)}
            >
              <MenuItem value="ALL">All</MenuItem>
              <MenuItem value="CASH">Cash</MenuItem>
              <MenuItem value="CREDIT-CARD">Credit Card</MenuItem>
              <MenuItem value="TRANSFER">Transfer</MenuItem>
              <MenuItem value="OTHER">Other</MenuItem>
            </Select>
          </FormControl>

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

export default TransactionListHeader;
