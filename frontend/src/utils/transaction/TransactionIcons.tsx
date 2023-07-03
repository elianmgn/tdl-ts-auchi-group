import React from 'react';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export const matchPaymentMethodIcon = (paymentMethod: string) => {
  switch (paymentMethod) {
    case 'CASH':
      return <LocalAtmIcon />;
    case 'CREDIT-CARD':
      return <CreditCardIcon />;
    case 'TRANSFER':
      return <AccountBalanceIcon />;
    default:
      return <MoreHorizIcon />;
  }
};