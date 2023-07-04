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
  Tooltip,
} from '@mui/material';

import IconButton from '@mui/material/IconButton';

import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';

import TransactionEntity from '../../models/TransactionEntity';
import { Typography } from '@mui/material';

import { matchPaymentMethodIcon } from '../../utils/transaction/TransactionIcons';
import dayjs from 'dayjs';

import { Icon } from '@material-ui/core';
import TransactionForm from './TransactionForm';
import useApiService from '../../services/apiService';

interface Column {
  id: 'description' | 'category' | 'date' | 'amount' | 'paymentMethod';
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
];

type ComponentProps = {
  filters: Record<string, string>;
};

export default function StickyHeadTable({ filters }: ComponentProps) {
  const { getUserTransactions } = useApiService();
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

  const fetchTransactions = async () => {
    const transactionsData = await getUserTransactions(filters);
    sortTransactionsByCreationDate(transactionsData);
  };

  React.useEffect(() => {
    fetchTransactions();
  }, [filters]);

  React.useEffect(() => {
    setIsLoading(false);
  }, [transactions]);

  const [ascendingDateSort, setAscendingDateSort] = React.useState(false);
  function sortTransactionsByCreationDate(transactionData: TransactionEntity[], ascending = false) {
    transactionData.sort((a, b) => {
      const dateA = a.date;
      const dateB = b.date;
      if (ascending) {
        // Older to newer
        return new Date(dateA).getTime() - new Date(dateB).getTime();
      }
      return new Date(dateB).getTime() - new Date(dateA).getTime();
    });
    setTrasactions(transactionData);
  }

  const sortByDateIcon = (id: string) => {
    if (id === 'date') {
      return (
        <IconButton
          size="small"
          onClick={() => {
            setAscendingDateSort(!ascendingDateSort);
            sortTransactionsByCreationDate(transactions, !ascendingDateSort);
          }}
        >
          {ascendingDateSort ? (
            <ArrowDownwardRoundedIcon fontSize="inherit" />
          ) : (
            <ArrowUpwardRoundedIcon fontSize="inherit" />
          )}
        </IconButton>
      );
    }
  };

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
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}
                      >
                        <div>{column.label}</div>
                        {sortByDateIcon(column.id)}
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <Tooltip key={row.id} title="Tap to edit or delete" arrow placement="top">
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
                              sx={{ backgroundColor: row['category']?.color }}
                              color="primary"
                              icon={<Icon>{row['category']?.icon}</Icon>}
                              label={row['category']?.name}
                            />
                          </TableCell>
                          <TableCell key="description">{row['description']}</TableCell>
                          <TableCell key="amount" align="right">
                            <Typography
                              style={{
                                color: row['type'] === 'EXPENSE' ? 'firebrick' : 'darkgreen',
                                fontWeight: 'bold',
                              }}
                            >
                              {row['type'] === 'EXPENSE' ? '- ' : '+ '}$ {row['amount']}
                            </Typography>
                          </TableCell>
                          <TableCell key="paymentMethod" align="center">
                            {matchPaymentMethodIcon(row['paymentMethod'])}
                          </TableCell>
                        </TableRow>
                      </Tooltip>
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
