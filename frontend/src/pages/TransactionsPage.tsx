import React from 'react';
import TransactionList from '../components/Transaction/TransactionList';

import TransactionForm from '../components/Transaction/TransactionForm';
import TransactionListHeader from '../components/Transaction/TransactionListHeader';

export default function TransactionsPage() {
  const [filters, setFilters] = React.useState({
    type: 'ALL',
    paymentMethod: 'ALL',
    dateFrom: '',
    dateTo: '',
    description: '',
  });
  
  const handleFilterChange = (filterName: string, value: string |  null) => {
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
      <TransactionListHeader
        filters={filters}
        handleFilterChange={handleFilterChange}
        handleOpen={handleOpen}
      />
      <TransactionForm open={openForm} handleClose={handleClose} />
      <TransactionList filters={filters} />
    </div>
  );
}
