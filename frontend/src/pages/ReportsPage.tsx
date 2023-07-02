import React from 'react';
import { Grid, Typography } from '@mui/material';
import CategoriesByAmountBarChart from '../components/Reports/CategoriesByAmountBarChart';
import CategoriesByBalanceBarChart from '../components/Reports/CategoriesByBalanceBarChart';
import CategoriesList from '../components/Reports/CategoriesList';

const ReportsPage = () => {
  return (
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
            Categories by Amount
          </Typography>
          <CategoriesByAmountBarChart />
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
            Categories by Balance
          </Typography>
          <CategoriesByBalanceBarChart />
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
            Categories List
          </Typography>
          <CategoriesList />
        </Grid>
      </Grid>
    </div>
  );
};

export default ReportsPage;
