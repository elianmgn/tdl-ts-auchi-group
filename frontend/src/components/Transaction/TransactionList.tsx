import * as React from 'react';
import './TransactionList.css';
import {
  CircularProgress,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import TransactionEntity from '../../models/TransactionEntity';
import { Typography } from '@mui/material';

import { matchPaymentMethodIcon } from '../../utils/transaction/TransactionIcons';
import dayjs from 'dayjs';

import CategoryIcon from '@mui/icons-material/Category';
import TransactionForm from './TransactionForm';
import TransactionFilter from '../../utils/transaction/TransactionFilter';

interface Column {
  id: 'description' | 'category' | 'date' | 'amount' | 'paymentMethod' | 'delete';
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
    id: 'paymentMethod',
    label: 'Method',
    width: 5,
  },
  {
    id: 'delete',
    label: '',
    width: 5,
  },
];

type ComponentProps = {
  filters: TransactionFilter;
};

export default function StickyHeadTable({ filters }: ComponentProps) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [transactions, setTrasactions] = React.useState<TransactionEntity[]>([]);

  const [isLoading, setIsLoading] = React.useState(true);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [transactionInfo, setTransactionInfo] = React.useState<TransactionEntity | null>(null);

  const handleOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleTransactionDelete = (id: number) => {
    fetch(`http://localhost:8080/transactions/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          fetchTransactions();
          console.log('Transacción eliminada');
        } else {
          console.error('Error al eliminar la transacción');
        }
      })
      .catch((error) => {
        console.error('Error de red', error);
      });
  };

  const fetchTransactions = async () => {
    const params = new URLSearchParams(filters).toString();
    const url = `http://localhost:8080/transactions/admin?${params}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const transactionsData = await response.json();
    setTrasactions(transactionsData);
  };

  React.useEffect(() => {
    fetchTransactions();
  }, [filters]);

  React.useEffect(() => {
    setIsLoading(false);
  }, [transactions]);

  return (
    <div style={{ width: '100%', overflow: 'hidden' }}>
      {isLoading ? (
        <div className="container">
          <CircularProgress />
        </div>
      ) : (
        <div>
          <TransactionForm
            open={openEdit}
            handleClose={handleCloseEdit}
            transactionInfo={transactionInfo}
          />
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
                {transactions
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        tabIndex={-1}
                        key={row.id}
                        onClick={() => {
                          setTransactionInfo(row);
                          handleOpenEdit();
                        }}
                      >
                        <TableCell key="date">{dayjs(row['date']).format('DD MMM')}</TableCell>
                        <TableCell key="category">
                          <Chip
                            variant="outlined"
                            icon={<CategoryIcon />}
                            label={
                              row['category']?.name.charAt(0).toUpperCase() +
                              row['category']?.name.toLowerCase().slice(1)
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
                        <TableCell key="paymentMethod" align="center">
                          {matchPaymentMethodIcon(row['paymentMethod'])}
                        </TableCell>
                        <TableCell key="delete" align="center">
                          <IconButton
                            onClick={() => row['id'] && handleTransactionDelete(row['id'])}
                          >
                            <DeleteIcon />
                          </IconButton>
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
            count={transactions.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      )}
    </div>
  );
}
