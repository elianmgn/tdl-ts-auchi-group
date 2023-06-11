import React from 'react';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';

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

export const matchCategoryIcon = (category: string) => {
  switch (category) {
    case 'SUPERMARKET':
      return <LocalGroceryStoreIcon />;
    case 'SUBSCRIPTION':
      return <CreditCardIcon />;
    case 'RENT':
      return <AccountBalanceIcon />;
    case 'SALARY':
      return <AccountBalanceIcon />;
    case 'GIFT':
      return <AccountBalanceIcon />;
    case 'EDUCATION':
      return <AccountBalanceIcon />;
    case 'HEALTH':
      return <AccountBalanceIcon />;
    case 'SHOPPING':
      return <AccountBalanceIcon />;
    case 'BILLS':
      return <AccountBalanceIcon />;
    case 'ENTERTAINMENT':
      return <AccountBalanceIcon />;
    case 'TRANSPORTATION':
      return <AccountBalanceIcon />;
    case 'PETS':
      return <AccountBalanceIcon />;
    case 'HOME':
      return <AccountBalanceIcon />;
    case 'SPORT':
      return <AccountBalanceIcon />;
    case 'UTILITIES':
      return <AccountBalanceIcon />;
    case 'ELECTRONICS':
      return <AccountBalanceIcon />;
    case 'INSURANCE':
      return <AccountBalanceIcon />;
    case 'CAR':
      return <AccountBalanceIcon />;
    case 'FRIENDS':
      return <AccountBalanceIcon />;
    default:
      return <MoreHorizIcon />;
  }
};
