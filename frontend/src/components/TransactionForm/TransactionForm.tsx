import React, { useEffect, useState } from 'react';
import './TransactionForm.css';
import {
  Box,
  FormHelperText,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ToggleButton,
  ToggleButtonGroup,
  OutlinedInput,
  InputAdornment,
  Alert,
  Snackbar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import { LoadingButton } from '@mui/lab';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

import { useForm, SubmitHandler } from 'react-hook-form';
import { number, object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';

import TransactionEntity from '../../models/TransactionEntity';
import { TRANSACTIONS_CATEGORIES } from '../../utils/TransactionEnums';

const formSchema = object({
  description: string()
    .nonempty('Name is required')
    .max(32, 'Name must be less than 32 characters'),
  category: string().nonempty('Category is required'),
  type: string().nonempty('Type is required'),
  amount: number({
    required_error: 'Amount is required',
    invalid_type_error: 'Amount must be a number',
  }).positive('Please use a positive number'),
  date: string().nonempty('Date is required'),
  payment_method: string().nonempty('Payment method is required'),
});

type RegisterInput = TypeOf<typeof formSchema>;
interface ComponenteProps {
  open: boolean;
  handleClose: () => void;
  transactionInfo?: TransactionEntity | null;
}

const TransactionForm: React.FC<ComponenteProps> = ({ open, handleClose, transactionInfo }) => {
  const [loading, setLoading] = useState(false);
  const [alertInfo, setAlertInfo] = useState({ open: false, error: false, message: '' });

  const {
    register,
    watch,
    setValue,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<RegisterInput>({
    resolver: zodResolver(formSchema),
  });

  const resetValues = () => {
    reset();
    setValue('category', '');
    setValue('payment_method', 'CASH');
    setValue('type', 'INCOME');
    setValue('date', dayjs().format('YYYY-MM-DD').toString());
  };

  const handleCloseAlert = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlertInfo({ open: false, error: alertInfo['error'], message: alertInfo['message'] });
  };

  async function postNewTransaction(values: RegisterInput) {
    setLoading(true);
    try {
      let response;
      if (transactionInfo) {
        response = await fetch('http://localhost:8080/transactions/admin', {
          method: 'POST',
          // body: JSON.stringify({
          //   description: watch('description'),
          //   category: watch('category'),
          //   amount: watch('amount'),
          //   date: watch('date'),
          //   type: watch('type'),
          //   payment_method: watch('payment_method'),
          // }),
          body: JSON.stringify(values),
        });
      } else {
        response = await fetch('http://localhost:8080/transactions/admin', {
          method: 'PATCH',
          // body: JSON.stringify({
          //   description: watch('description'),
          //   category: watch('category'),
          //   amount: watch('amount'),
          //   date: watch('date'),
          //   type: watch('type'),
          //   payment_method: watch('payment_method'),
          // }),
          body: JSON.stringify(values),
        });
      }

      if (!response.ok) {
        // Si la respuesta no es exitosa, lanza un error
        throw new Error('Error al obtener los datos de la API');
      }

      // const data = await response.json();

      setLoading(false);
      setAlertInfo({
        open: true,
        error: false,
        message: 'The transaction was saved successfully.',
      });
      handleClose();
      resetValues();
    } catch (error) {
      setAlertInfo({ open: true, error: true, message: 'There was an error with the request.' });
      setLoading(false);
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    if (transactionInfo) {
      setValue('description', transactionInfo.description);
      setValue('category', transactionInfo.category);
      setValue('amount', transactionInfo.amount);
      setValue('date', transactionInfo.date);
      setValue('type', transactionInfo.type);
      setValue('payment_method', transactionInfo.payment_method);
    } else {
      resetValues();
    }
    setLoading(false);
  }, [open]);

  const onSubmitHandler: SubmitHandler<RegisterInput> = (values) => {
    console.log('Values:');
    postNewTransaction(values);
    console.log(values);
  };

  return (
    <div>
      <Snackbar
        open={alertInfo['open']}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert variant="filled" severity={alertInfo['error'] ? 'error' : 'success'}>
          {alertInfo['message']}
        </Alert>
      </Snackbar>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Transaction</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmitHandler)}
            className="form-container"
          >
            {/* Description Input */}
            <TextField
              label="Description"
              fullWidth
              required
              error={!!errors['description']}
              helperText={errors['description'] ? errors['description'].message : ''}
              {...register('description')}
            />

            <div className="amount-type-container">
              {/* Amount Input */}
              <FormControl error={!!errors['amount']} fullWidth>
                <InputLabel htmlFor="amount">Amount</InputLabel>
                <OutlinedInput
                  inputProps={{
                    type: 'number',
                  }}
                  id="amount"
                  value={watch('amount')}
                  startAdornment={<InputAdornment position="start">$</InputAdornment>}
                  label="Amount"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setValue('amount', Number(event.target.value));
                  }}
                />
                <FormHelperText>{errors['amount'] ? errors['amount'].message : ''}</FormHelperText>
              </FormControl>

              {/* Type Input */}
              <ToggleButtonGroup
                color="primary"
                value={watch('type')}
                exclusive
                onChange={(_: React.MouseEvent<HTMLElement>, value: string) => {
                  if (value !== null) {
                    setValue('type', value);
                  }
                }}
                aria-label="type"
                className="toggle-button-group"
              >
                <ToggleButton value="INCOME" aria-label="income">
                  <AddIcon />
                </ToggleButton>
                <ToggleButton value="EXPENSE" aria-label="expense">
                  <RemoveIcon />
                </ToggleButton>
              </ToggleButtonGroup>

              {/* Payment Method Input */}
              <ToggleButtonGroup
                color="primary"
                value={watch('payment_method')}
                exclusive
                onChange={(_: React.MouseEvent<HTMLElement>, value: string) => {
                  if (value !== null) {
                    setValue('payment_method', value);
                  }
                }}
                aria-label="payment method"
                className="toggle-button-group"
              >
                <ToggleButton value="CASH" aria-label="cash">
                  <LocalAtmIcon />
                </ToggleButton>
                <ToggleButton value="CREDIT_CARD" aria-label="credit card">
                  <CreditCardIcon />
                </ToggleButton>
                <ToggleButton value="TRANSFER" aria-label="transfer">
                  <AccountBalanceIcon />
                </ToggleButton>
                <ToggleButton value="OTHER" aria-label="other">
                  <MoreHorizIcon />
                </ToggleButton>
              </ToggleButtonGroup>
            </div>

            {/* Category Input */}
            <FormControl fullWidth error={!!errors['category']} required>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                value={watch('category')}
                labelId="category-label"
                id="category-input"
                label="Category"
                defaultValue=""
                {...register('category')}
              >
                {TRANSACTIONS_CATEGORIES.map((category: string) => (
                  <MenuItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.toLowerCase().slice(1)}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>
                {errors['category'] ? errors['category'].message : ''}
              </FormHelperText>
            </FormControl>

            {/* Date Input */}
            <div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DateCalendar']} sx={{ alignSelf: 'center' }}>
                  <DemoItem label="">
                    <DateCalendar
                      value={dayjs(watch('date'))}
                      onChange={(newValue) => {
                        if (newValue !== null) {
                          setValue('date', newValue.format('YYYY-MM-DD').toString());
                        }
                      }}
                    />
                  </DemoItem>
                </DemoContainer>
              </LocalizationProvider>
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <LoadingButton onClick={handleSubmit(onSubmitHandler)} type="submit" loading={loading}>
            Save
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TransactionForm;
// https://codevoweb.com/form-validation-react-hook-form-material-ui-react/
