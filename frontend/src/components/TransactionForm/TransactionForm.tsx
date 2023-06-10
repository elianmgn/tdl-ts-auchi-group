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

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

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
interface ComponenteProps {
  open: boolean;
  handleClose: () => void;
}

const TransactionForm: React.FC<ComponenteProps> = ({ open, handleClose }) => {
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

  const resetValues = () => {
    reset();
    setValue('payment_method', 'cash');
    setValue('type', 'income');
    setValue('date', dayjs().format('YYYY-MM-DD').toString());
  };

  async function loadButtonForMs(ms: number) {
    await new Promise((resolve) => setTimeout(resolve, ms));
    setLoading(false);
    resetValues();
    handleClose();
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      setLoading(true);
      loadButtonForMs(2000);
    }
  }, [isSubmitSuccessful]);

  useEffect(() => {
    resetValues();
  }, [open]);

  const onSubmitHandler: SubmitHandler<RegisterInput> = (values) => {
    console.log(values);
  };
  console.log(errors);

  return (
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
              <ToggleButton value="income" aria-label="income">
                <AddIcon />
              </ToggleButton>
              <ToggleButton value="expense" aria-label="expense">
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
          </div>

          {/* Category Input */}
          <FormControl fullWidth error={!!errors['category']} required>
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
  );
};

export default TransactionForm;
// https://codevoweb.com/form-validation-react-hook-form-material-ui-react/
