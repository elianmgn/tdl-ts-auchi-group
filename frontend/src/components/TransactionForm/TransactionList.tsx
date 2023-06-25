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
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

import TransactionEntity from '../../models/TransactionEntity';
import { Typography } from '@mui/material';

import { matchPaymentMethodIcon } from '../../utils/TransactionIcons';
import dayjs from 'dayjs';

import CategoryIcon from '@mui/icons-material/Category';
import TransactionForm from './TransactionForm';

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

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [transactions, setTrasactions] = React.useState<TransactionEntity[]>([]);

  const [isLoading, setIsLoading] = React.useState(true);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [transactionInfo, setTransactionInfo] = React.useState<TransactionEntity | null>(null);

  const [filters, setFilters] = React.useState({
    type: 'ALL',
    paymentMethod: 'ALL',
    dateFrom: '',
    dateTo: '',
    description: '',
  });

  const handleFilterChange = (filterName: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

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
    const params = new URLSearchParams(filters).toString();
    const url = `http://localhost:8080/transactions/admin?${params}`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const transactionsData = await response.json();
    console.log(transactionsData);
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
        <div className='container'>
          <CircularProgress />
        </div>
      ) : (
        <div>
          {/* Controles de filtrado */}
          <div style={{ marginTop: '35px' }}>
            <FormControl style={{ width: '130px', marginLeft: '20px' }}>
              <InputLabel style={{ transform: 'translate(50px, -20px)', fontSize: '12px', fontWeight: 'bold' }}
              >
                Tipo
              </InputLabel>
              <Select
                value={filters.type}
                onChange={(event) => handleFilterChange('type', event.target.value)}
              >
                <MenuItem value="ALL">Todos</MenuItem>
                <MenuItem value="INCOME">Ingreso</MenuItem>
                <MenuItem value="EXPENSE">Egreso</MenuItem>
              </Select>
            </FormControl>

            <FormControl style={{ width: '130px' }}>
              <InputLabel style={{ transform: 'translate(20px, -20px)', fontSize: '12px', fontWeight: 'bold' }}
              >
                Método de Pago
              </InputLabel>
              <Select
                value={filters.paymentMethod}
                onChange={(event) => handleFilterChange('paymentMethod', event.target.value)}
              >
                <MenuItem value="ALL">Todos</MenuItem>
                <MenuItem value="CASH">Efectivo</MenuItem>
                <MenuItem value="CREDIT-CARD">Tarjeta de Crédito</MenuItem>
                <MenuItem value="TRANSFER">Transferencia</MenuItem>
                <MenuItem value="OTHER">Otro</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Description"
              value={filters.description}
              onChange={(event) => handleFilterChange('description', event.target.value)}
            />

            <TextField
              label="Fecha de Inicio"
              type="date"
              value={filters.dateFrom}
              onChange={(event) => handleFilterChange('dateFrom', event.target.value)}
              InputLabelProps={{
                shrink: true,
                style: { marginTop: '-10px' },
              }}
            />

            <TextField
              label="Fecha de Fin"
              type="date"
              value={filters.dateTo}
              onChange={(event) => handleFilterChange('dateTo', event.target.value)}
              InputLabelProps={{
                shrink: true,
                style: { marginTop: '-10px' },
              }}
            />

          </div>

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
