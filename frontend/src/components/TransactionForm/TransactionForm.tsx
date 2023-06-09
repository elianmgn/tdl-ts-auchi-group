import React, { useEffect, useState } from 'react';
import {
  Box,
  FormHelperText,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ToggleButton,
  ToggleButtonGroup,
  OutlinedInput,
  InputAdornment,
} from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PublishIcon from '@mui/icons-material/Publish';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { LoadingButton } from '@mui/lab';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

import { useForm, SubmitHandler } from 'react-hook-form';
import { number, object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';

const formSchema = object({
  description: string()
    .nonempty('Name is required')
    .max(32, 'Name must be less than 32 characters'),
  category: string().nonempty('Category is required'),
  type: string().nonempty('Type is required'),
  amount: number().nonnegative('Please use a positive number'),
  date: string().nonempty('Date is required'),
  payment_method: string().nonempty('Payment method is required'),
});

type RegisterInput = TypeOf<typeof formSchema>;

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    watch,
    setValue,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm<RegisterInput>({
    resolver: zodResolver(formSchema),
  });

  async function loadButtonForMs(ms: number) {
    await new Promise((resolve) => setTimeout(resolve, ms));
    setLoading(false);
    reset();
    setValue('payment_method', 'cash');
    setValue('type', 'income');
    setValue('date', dayjs().format('YYYY-MM-DD').toString());
  }


  useEffect(() => {
    if (isSubmitSuccessful) {
      setLoading(true);
      loadButtonForMs(2000);
    }
  }, [isSubmitSuccessful]);

  useEffect(() => {
    setValue('payment_method', 'cash');
    setValue('type', 'income');
    setValue('date', dayjs().format('YYYY-MM-DD').toString());
  }, []);

  const onSubmitHandler: SubmitHandler<RegisterInput> = (values) => {
    console.log(values);
  };
  console.log(errors);

  return (
    <div className="container">
      <div className="form-container">
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          {/* Description Input */}
          <TextField
            sx={{ mb: 2 }}
            label="Description"
            fullWidth
            required
            error={!!errors['description']}
            helperText={errors['description'] ? errors['description'].message : ''}
            {...register('description')}
          />

          {/* Amount Input */}
          <FormControl fullWidth sx={{ mb: 2 }} error={!!errors['amount']}>
            <InputLabel htmlFor="amount">Amount</InputLabel>
            <OutlinedInput
              inputProps={{
                type: 'number', // Patrón adicional para dispositivos móviles
              }}
              id="amount"
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              label="Amount"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setValue('amount', Number(event.target.value));
              }}
            />
            <FormHelperText>{errors['amount'] ? errors['amount'].message : ''}</FormHelperText>
          </FormControl>

          {/* Category Input */}
          <FormControl fullWidth sx={{ mb: 2 }} error={!!errors['category']} required>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              id="category-input"
              label="Category"
              {...register('category')}
            >
              <MenuItem value={'supermarket'}>Supermarket</MenuItem>
            </Select>
            <FormHelperText>{errors['category'] ? errors['category'].message : ''}</FormHelperText>
          </FormControl>

          {/* Date Input */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateCalendar']}>
              <DemoItem label="Controlled calendar">
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
          >
            <ToggleButton value="income" aria-label="income">
              <PublishIcon />
              Income
            </ToggleButton>
            <ToggleButton value="expense" aria-label="expense">
              <FileDownloadIcon />
              Expense
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
          >
            <ToggleButton value="cash" aria-label="cash">
              <LocalAtmIcon />
            </ToggleButton>
            <ToggleButton value="credit-card" aria-label="credit card">
              <CreditCardIcon />
            </ToggleButton>
            <ToggleButton value="transfer" aria-label="transfer">
              <AccountBalanceIcon />
            </ToggleButton>
            <ToggleButton value="other" aria-label="other">
              <MoreHorizIcon />
            </ToggleButton>
          </ToggleButtonGroup>

          <LoadingButton
            variant="contained"
            type="submit"
            loading={loading}
            sx={{ py: '0.8rem', mt: '1rem' }}
          >
            Save
          </LoadingButton>
        </Box>
      </div>
    </div>
  );
};

export default RegisterPage;
// https://codevoweb.com/form-validation-react-hook-form-material-ui-react/
