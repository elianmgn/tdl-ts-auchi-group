import React from 'react';
import AccountBalance from '../components/Dashboard/AccountBalance';
import BasicDateCalendar from '../components/Dashboard/DateCalendar';
import { Grid } from '@mui/material';
import PieChart from '../components/Dashboard/PieChart';

export default function DashboardPage() {
  return(
    <Grid container p={5} gap={2} display='flex' justifyContent='center'>
      <Grid item xs={7} sx={{ boxShadow: 2, borderRadius: 3 }}>
        <AccountBalance />
      </Grid>
      <Grid item xs={3} p={2} sx={{ boxShadow: 2, borderRadius: 3 }} alignSelf='center'>
        <BasicDateCalendar />
      </Grid>
      <Grid item xs={10} sx={{ boxShadow: 2, borderRadius: 5 }}>
        <PieChart />
      </Grid>
    </Grid>
  )
} 