import React from 'react';
import { Button, Box, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Currencies from './Currencies';
import useApiService from '../../services/apiService';

const GetAccountBalances = async (
  getUserBalance: (params: Record<string, string>) => Promise<Response>,
) => {
  try {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');

    const formattedDate = `${year}-${month}-01`;

    const generalResponse = await getUserBalance({});
    const generalBalance = await generalResponse.json();

    const currentMonthResponse = await getUserBalance({ dateFrom: formattedDate });
    const currentMonthBalance = await currentMonthResponse.json();

    return [generalBalance, currentMonthBalance];
  } catch (e) {
    console.log(e);
    return [];
  }
};

function AccountBalance() {
  const { getUserBalance } = useApiService();
  const navigate = useNavigate();
  const [balance, setBalance] = React.useState(0);
  const [variance, setVariance] = React.useState('+ AR$ 0');
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    GetAccountBalances(getUserBalance).then((data) => {
      setBalance(data[0]);
      determineVariance(data[1]);
      setIsLoading(false);
    });
  }, []);

  const determineVariance = (currentMonthBalance: number) => {
    if (currentMonthBalance < 0) {
      setVariance('- AR$ ' + currentMonthBalance.toLocaleString().substring(1));
    } else {
      setVariance('+ AR$ ' + currentMonthBalance.toLocaleString());
    }
  };

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
              fontFamily="Noto Sans"
            >
              Account Balance
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h2" gutterBottom fontFamily="Noto Sans">
              AR$ {balance.toLocaleString()}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Box display="flex" alignItems="baseline" gap={2}>
              <Typography variant="h4" fontFamily="Noto Sans" fontWeight={100}>
                {variance}
              </Typography>
              <Typography variant="subtitle1" noWrap fontFamily="Noto Sans">
                this month
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={4}>
            <Button fullWidth variant="contained" onClick={() => navigate('/transactions')}>
              <Typography variant="subtitle1" fontFamily="Noto Sans">
                Add new transaction
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" noWrap fontFamily="Noto Sans" fontWeight={400}>
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
