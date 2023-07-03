import React from 'react';
import { Grid, Typography } from '@mui/material';
import TransactionsByCategoryBarChart from '../components/Reports/TransactionsByCategoryBarChart';
import BalanceByCategoriesBarChart from '../components/Reports/BalanceByCategoriesBarChart';
import CategoriesList from '../components/Reports/CategoriesList';
import ReportChartsHeader from '../components/Reports/ReportChartsHeader';

const ReportsPage = () => {
  // Get first day of current month, formatted as yyyy-mm-dd
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const firstMonthDayFormatted = `${year}-${month}-01`;
  // Get last day of current month, formatted as yyyy-mm-dd
  const toDate = new Date(year, today.getMonth() + 1, 1);
  toDate.setDate(toDate.getDate() - 1);
  const lastMonthDayFormatted = `${toDate.getFullYear()}-${(toDate.getMonth() + 1).toString().padStart(2, '0')}-${toDate.getDate().toString().padStart(2, '0')}`
  // Set them as default values for the filters
  const [filters, setFilters] = React.useState({
    dateFrom: firstMonthDayFormatted,
    dateTo: lastMonthDayFormatted,
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const [transactions, setTransactions] = React.useState([]);

  const handleFilterChange = (filterName: string, value: string |  null) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  React.useEffect(() => {
      getTransactions()
    }, []);

  const getTransactions = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:8080/transactions/admin?dateFrom=${filters.dateFrom}&dateTo=${filters.dateTo}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const transactions = await response.json();
      console.log('FILTERED TRANSACTIONS:', transactions);
      setTransactions(transactions);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <ReportChartsHeader filters={filters} handleFilterChange={handleFilterChange} handleGenerateReports={getTransactions}/>
      {
        isLoading ?
        <div>Loading...</div>
        :
        <div>
          <Grid container p={5} gap={2} display='flex' justifyContent='center'>
            <Grid item xs={3} sx={{ boxShadow: 2, borderRadius: 3, textAlign: 'center' }}>
              <Typography
                sx={{
                  pb: 1,
                  pt: 2
                }}
                variant="h4"
                fontFamily="Segoe UI"
              >
                Transactions by Category
              </Typography>
              <TransactionsByCategoryBarChart transactions={transactions}/>
            </Grid>

            <Grid item xs={3} sx={{ boxShadow: 2, borderRadius: 3, textAlign: 'center' }}>
              <Typography
                sx={{
                  pb: 1,
                  pt: 2
                }}
                variant="h4"
                fontFamily="Segoe UI"
              >
                Balance by Category
              </Typography>
              <BalanceByCategoriesBarChart transactions={transactions} />
            </Grid>

            <Grid item xs={3} sx={{ boxShadow: 2, borderRadius: 3, textAlign: 'center' }}>
              <Typography
                sx={{
                  pb: 1,
                  pt: 2
                }}
                variant="h4"
                fontFamily="Segoe UI"
              >
                Categories with transactions
              </Typography>
              <CategoriesList transactions={transactions}/>
            </Grid>
          </Grid>
        </div>

      }
    </>
  );
};

export default ReportsPage;
