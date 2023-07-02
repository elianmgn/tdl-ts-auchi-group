import React from 'react';
import { Button, Box, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Currencies from './Currencies';

const GetAccountBalance = async () => {
  try {
    const response = await fetch('http://localhost:8080/user/balance/admin', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
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
    GetAccountBalance().then((data) => {
      setBalance(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Grid p={3} spacing={2} container sx={{ alignItems: 'center' }}>
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
          <Grid item xs={7}>
            <Typography variant="h2" gutterBottom fontFamily="Segoe UI">
              AR$ {balance.toLocaleString()}
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Box display="flex" alignItems="baseline" gap={2}>
              <Typography variant="h4" fontFamily="Segoe UI" fontWeight={100}>
                + AR$ {variance.toLocaleString()}
              </Typography>
              <Typography variant="subtitle1" noWrap fontFamily="Segoe UI">
                this month
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Button fullWidth variant="contained" onClick={() => navigate('/transactions')}>
              <Typography variant="subtitle1" fontFamily="Segoe UI">
                Add new transaction
              </Typography>
            </Button>
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
