import React from 'react';
import CategoryList from '../components/Category/CategoryList';
import CategoryForm from '../components/Category/CategoryForm';
import CategoryListHeader from '../components/Category/CategoryListHeader';

export default function CategoriesPage() {
  const [filters, setFilters] = React.useState({
    name: '',
    dateFrom: '',
    dateTo: '',
  });

  const handleFilterChange = (filterName: string, value: string | null) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  const [openForm, setOpenForm] = React.useState(false);
  const handleOpen = () => {
    setOpenForm(true);
  };

  const handleClose = () => {
    setOpenForm(false);
  };

  return (
    <div>
      <CategoryListHeader
        filters={filters}
        handleFilterChange={handleFilterChange}
        handleOpen={handleOpen}
      />
      <CategoryForm open={openForm} handleClose={handleClose} />
      <CategoryList filters={filters} />
    </div>
  );
}
