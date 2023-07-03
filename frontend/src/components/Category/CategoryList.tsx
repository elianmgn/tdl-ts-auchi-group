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
  IconButton,
  Chip,
  Tooltip,
} from '@mui/material';
import { Icon } from '@material-ui/core';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';

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
  { id: 'description', label: 'Description', minWidth: 100 },
];

type ComponentProps = {
  filters: Record<string, string>;
};

export default function StickyHeadTable({ filters }: ComponentProps) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [categories, setCategories] = React.useState<(typeof CategoryEntity)[]>([]);

  const [isLoading, setIsLoading] = React.useState(true);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [categoryInfo, setCategoryInfo] = React.useState<typeof CategoryEntity | null>(null);

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
    const url = `http://localhost:8080/categories/?${params}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const categoriesData: (typeof CategoryEntity)[] = await response.json();
    sortCategoriesByCreationDate(categoriesData, ascendingDateSort);
  };

  React.useEffect(() => {
    fetchCategories();
  }, [filters]);

  React.useEffect(() => {
    setIsLoading(false);
  }, [categories]);

  const [ascendingDateSort, setAscendingDateSort] = React.useState(false);
  function sortCategoriesByCreationDate(
    categoriesData: (typeof CategoryEntity)[],
    ascending = false,
  ) {
    categoriesData.sort((a, b) => {
      const dateA = a.createdAt;
      const dateB = b.createdAt;
      if (ascending) {
        // Older to newer
        return new Date(dateA).getTime() - new Date(dateB).getTime();
      }
      return new Date(dateB).getTime() - new Date(dateA).getTime();
    });
    setCategories(categoriesData);
  }

  const sortByDateIcon = (id: string) => {
    if (id === 'createdAt') {
      return (
        <IconButton
          size="small"
          onClick={() => {
            setAscendingDateSort(!ascendingDateSort);
            sortCategoriesByCreationDate(categories, !ascendingDateSort);
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
          <CategoryForm open={openEdit} handleClose={handleCloseEdit} categoryInfo={categoryInfo} />
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
                {categories
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <Tooltip key={row.id} title="Tap to edit or delete" arrow placement="top">
                        <TableRow
                          hover
                          tabIndex={-1}
                          key={row.id}
                          onClick={() => {
                            setCategoryInfo(row);
                            handleOpenEdit();
                          }}
                        >
                          <TableCell key="createdAt">
                            {dayjs(row['createdAt']).format('DD MMM')}
                          </TableCell>
                          <TableCell key="name">
                            <Chip
                              sx={{ backgroundColor: row['color'] }}
                              color="primary"
                              icon={<Icon>{row['icon']}</Icon>}
                              label={row['name']}
                            />
                          </TableCell>
                          <TableCell key="description">{row['description']}</TableCell>
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
