import * as React from 'react';
import './CategoryList.css';
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from '@mui/material';

import dayjs from 'dayjs';

import CategoryForm from './CategoryForm';
import CategoryEntity from '../../models/CategoryEntity';

interface Column {
  id: 'description' | 'name' | 'createdAt';
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
];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [categories, setCategories] = React.useState<typeof CategoryEntity[]>([]);

  const [isLoading, setIsLoading] = React.useState(true);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [categoryInfo, setCategoryInfo] = React.useState<typeof CategoryEntity | null>(null);

  const [filters, setFilters] = React.useState({
    dateFrom: '',
    dateTo: '',
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

  const fetchCategories = async () => {
    const params = new URLSearchParams(filters).toString();
    const url = `http://localhost:8080/categories/?${params}`
    const response = await fetch(url, {
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
  }, [filters]);

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
          {/* Controles de filtrado */}
          <div style={{ marginTop: '35px', marginLeft: '20px' }}>
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
                        <TableCell key="createdAt">{dayjs(row['createdAt']).format('DD MMM')}</TableCell>
                        <TableCell key="name">{row['name']}</TableCell>
                        <TableCell key="description">{row['description']}</TableCell>
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
