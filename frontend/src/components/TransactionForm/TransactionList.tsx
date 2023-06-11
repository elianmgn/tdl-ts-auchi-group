import * as React from 'react';
import './TransactionList.css';
import {
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';

import TransactionEntity from '../../models/TransactionEntity';
import { Typography } from '@mui/material';

import { matchPaymentMethodIcon } from '../../utils/TransactionsIcons';
import dayjs from 'dayjs';

import CategoryIcon from '@mui/icons-material/Category';

interface Column {
  id: 'description' | 'category' | 'date' | 'amount' | 'payment_method';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
  width?: number;
}

const columns: readonly Column[] = [
  {
    id: 'date',
    label: 'Date',
    width: 50,
  },
  { id: 'category', label: 'Category', width: 5 },
  { id: 'description', label: 'Description', minWidth: 50 },
  {
    id: 'amount',
    label: 'Amount',
    align: 'right',
    format: (value: number) => value.toFixed(2),
  },
  {
    id: 'payment_method',
    label: 'Method',
    width: 5,
  },
];

// interface TransactionEntity {
//   id: number;
//   description: string;
//   category: string;
//   payment_method: string;
//   date: number;
//   amount: number;
// }

function createData(
  id: number,
  description: string,
  category: string,
  payment_method: string,
  type: string,
  date: string,
  amount: number,
): TransactionEntity {
  return { id, description, category, payment_method, type, date, amount };
}

const rows = [
  createData(1, 'Verduleria', 'MARKET', 'CASH', 'EXPENSE', '2023-06-11', 324452),
  createData(2, 'Ingreso de dinero', 'OTHER', 'TRANSFER', 'INCOME', '2023-09-04', 3489),
];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, width: column.width }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover tabIndex={-1} key={row.id} onClick={() => console.log('petisa')}>
                  <TableCell key="date">{dayjs(row['date']).format('DD MMM')}</TableCell>
                  <TableCell key="category">
                    <Chip
                      variant="outlined"
                      icon={<CategoryIcon />}
                      label={
                        row['category'].charAt(0).toUpperCase() +
                        row['category'].toLowerCase().slice(1)
                      }
                    />
                  </TableCell>
                  <TableCell key="description">{row['description']}</TableCell>
                  <TableCell key="amount" align="right">
                    <Typography
                      style={{
                        color: row['type'] === 'EXPENSE' ? 'darkred' : 'darkgreen',
                        fontWeight: 'bold',
                      }}
                    >
                      {row['type'] === 'EXPENSE' ? '- ' : '+ '}$ {row['amount']}
                    </Typography>
                  </TableCell>
                  <TableCell key="payment_method" align="center">
                    {matchPaymentMethodIcon(row['payment_method'])}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
