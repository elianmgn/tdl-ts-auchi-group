/* eslint-disable react/prop-types */
import React from 'react';
import {
  Card,
  Grid,
  Typography,
} from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

type MiniCardProps = {
  balance: number;
  currencyName: string;
  currencyValue: string;
};

export default function MiniCard(props: MiniCardProps): React.ReactElement {
  const { balance, currencyName, currencyValue } = props;
  const value = parseFloat(currencyValue.replace(',','.'));

  return(
    <Card sx={{ backgroundColor: '#f5f7ff', padding: 2 }}>
      <Grid container>
        <Grid item display='flex' alignItems='center'>
          <AttachMoneyIcon />
          <Typography fontFamily='Segoe UI' fontSize={20}>
            {(balance / value).toFixed(2)}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography fontFamily='Segoe UI' fontStyle='italic'>
            {currencyName}
          </Typography>
        </Grid>
        <Grid item>
          <Typography fontFamily='Segoe UI' fontSize={12}>
            1 USD = {value} ARS
          </Typography>
        </Grid>
      </Grid>
    </Card>
  )
}