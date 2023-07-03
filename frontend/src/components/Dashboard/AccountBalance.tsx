import React from 'react';
import { Button, Box, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Currencies from './Currencies';

const GetAccountBalances = async () => {
  try {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');

    const formattedDate = `${year}-${month}-01`;

    console.log('First day of current month:', formattedDate);

    const generalResponse = await fetch('http://localhost:8080/user/balance/admin', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const generalBalance = await generalResponse.json();
    console.log('general:', generalBalance);

    const prevMonthResponse = await fetch(`http://localhost:8080/user/balance/admin?dateTo=${formattedDate}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const prevMonthBalance = await prevMonthResponse.json();
    console.log('prevMonthResponse:', prevMonthBalance);

    return generalBalance;
  } catch (e) {
    console.log(e);
    return 0;
  }
};

function AccountBalance() {
  const navigate = useNavigate();
  const [balance, setBalance] = React.useState(54584.23);
  const [variance, setVariance] = React.useState(3594.01);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    GetAccountBalances().then((data) => {
      setBalance(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Grid p={3} spacing={1} container sx={{ alignItems: 'center' }}>
          <Grid item xs={12}>
            <Typography
              sx={{
                pb: 3,
              }}
              variant="h4"
              fontFamily="Segoe UI"
            >
              Account Balance
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h2" gutterBottom fontFamily="Segoe UI">
              AR$ {balance.toLocaleString()}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Box display="flex" alignItems="baseline" gap={2}>
              <Typography variant="h4" fontFamily="Segoe UI" fontWeight={100}>
                + AR$ {variance.toLocaleString()}
              </Typography>
              <Typography variant="subtitle1" noWrap fontFamily="Segoe UI">
                this month
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={4}>
            <Button fullWidth variant="contained" onClick={() => navigate('/transactions')}>
              <Typography variant="subtitle1" fontFamily="Segoe UI">
                Add new transaction
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" noWrap fontFamily="Segoe UI" fontWeight={400}>
              Equivalent to:
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Currencies balance={balance} />
          </Grid>
        </Grid>
      )}
    </>
  );
}

export default AccountBalance;
