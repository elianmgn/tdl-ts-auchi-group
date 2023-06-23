import * as React from 'react';
import './TransactionList.css';
import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  CircularProgress,
} from '@mui/material';

import TransactionEntity from '../../models/TransactionEntity';
import { Typography } from '@mui/material';

import { matchPaymentMethodIcon } from '../../utils/TransactionIcons';
import dayjs from 'dayjs';

import CategoryIcon from '@mui/icons-material/Category';
import CategoryForm from './CategoryForm';
import CategoryEntity from '../../models/CategoryEntity';

interface Column {
  id: 'description' | 'name' | 'createdAt' | 'type';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
  width?: number;
}

const columns: readonly Column[] = [
  {
    id: 'createdAt',
    label: 'Date',
    width: 50,
  },
  { id: 'name', label: 'Name', minWidth: 50 },
  { id: 'description', label: 'Description', minWidth: 50 },
  { id: 'type', label: 'Type', minWidth: 50 },
];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [categories, setCategories] = React.useState<CategoryEntity[]>([]);

  const [isLoading, setIsLoading] = React.useState(true);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [categoryInfo, setCategoryInfo] = React.useState<CategoryEntity | null>(null);

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

  const fetchCategories = async () => {
    const response = await fetch(`http://localhost:8080/categories`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const categoriesData = await response.json();
    setCategories(categoriesData);
  };

  React.useEffect(() => {
    fetchCategories();
  }, []);

  React.useEffect(() => {
    setIsLoading(false);
  }, [categories]);

  return (
    <div style={{ width: '100%', overflow: 'hidden' }}>
      {isLoading ? (
        <div className='container'>
          <CircularProgress />
        </div>
      ) : (
        <div>
          <CategoryForm
            open={openEdit}
            handleClose={handleCloseEdit}
            categoryInfo={categoryInfo}
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
                {categories
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        tabIndex={-1}
                        key={row.id}
                        onClick={() => {
                          setCategoryInfo(row);
                          handleOpenEdit();
                        }}
                      >
                        <TableCell key="createdAt">{dayjs(row['date']).format('DD MMM')}</TableCell>
                        <TableCell key="name">{row['name']}</TableCell>
                        <TableCell key="description">{row['description']}</TableCell>
                        <TableCell key="type" align="right">
                          <Typography
                            style={{
                              color: row['type'] === 'EXPENSE' ? 'darkred' : 'darkgreen',
                              fontWeight: 'bold',
                            }}
                          >
                            {row['type'] === 'EXPENSE' ? '- ' : '+ '}$ 
                          </Typography>
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
            count={categories.length}
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
