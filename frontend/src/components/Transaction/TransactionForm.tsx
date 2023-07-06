import React, { useEffect, useState, useContext } from 'react';
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

import { SnackbarContext } from '../../contexts/SnackbarContext';
import TransactionEntity from '../../models/TransactionEntity';
import CategoryEntity from '../../models/CategoryEntity';
import useApiService from '../../services/apiService';

const formSchema = object({
  description: string()
    .nonempty('Name is required')
    .max(32, 'Name must be less than 32 characters'),
  category: string().nonempty('Category is required'),
  // category: string().refine(
  //   (value: unknown) => {
  //     return typeof value === 'string' && value !== '';
  //   },
  //   {
  //     message: 'Category is required',
  //   },
  // ),
  type: string().nonempty('Type is required'),
  amount: number({
    required_error: 'Amount is required',
    invalid_type_error: 'Amount must be a number',
  }).positive('Please use a positive number'),
  date: string().nonempty('Date is required'),
  paymentMethod: string().nonempty('Payment method is required'),
});

type RegisterInput = TypeOf<typeof formSchema>;
interface ComponentProps {
  open: boolean;
  handleClose: () => void;
  transactionInfo?: TransactionEntity | null;
}

function TransactionForm({ open, handleClose, transactionInfo }: ComponentProps) {
  const { showSnackbar } = useContext(SnackbarContext);
  const { postUserTransaction, putUserTransaction, deleteUserTransaction, getUserCategories } =
    useApiService();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<(typeof CategoryEntity)[]>([]);

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
    setValue('paymentMethod', 'CASH');
    setValue('type', 'INCOME');
    setValue('date', dayjs().format('YYYY-MM-DD').toString());
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await getUserCategories();
        const formattedCategories = categoriesData.map((category: typeof CategoryEntity) => ({
          id: category.id?.toString(),
          name: category.name,
        }));
        setCategories(formattedCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }

      if (transactionInfo) {
        setValue('description', transactionInfo.description);
        setValue('category', transactionInfo.category?.id?.toString() ?? '');
        setValue('amount', transactionInfo.amount);
        setValue('date', transactionInfo.date);
        setValue('type', transactionInfo.type);
        setValue('paymentMethod', transactionInfo.paymentMethod);
      } else {
        resetValues();
      }
      setLoading(false);
    };

    fetchData();
  }, [open]);

  const onSubmitHandler: SubmitHandler<RegisterInput> = async (values) => {
    setLoading(true);
    try {
      let response;
      if (transactionInfo) {
        const transactionId = transactionInfo.id?.toString() || '';
        response = await putUserTransaction(transactionId, JSON.stringify(values));
      } else {
        response = await postUserTransaction(JSON.stringify(values));
      }

      if (!response.ok) {
        // Si la respuesta no es exitosa, lanza un error
        throw new Error('Error al obtener los datos de la API');
      }

      // const data = await response.json();

      setLoading(false);
      window.location.reload();
      
      showSnackbar('The transaction was saved successfully', 'success');
      handleClose();
      resetValues();
    } catch (error) {
      showSnackbar('There was an error with the request', 'error');
      setLoading(false);
      console.error('Error:', error);
    }
  };

  const handleDelete = () => {
    setLoading(true);
    deleteUserTransaction(transactionInfo?.id?.toString() || '')
      .then((response) => {
        setLoading(false);
        if (!response.ok) {
          // Si la respuesta no es exitosa, lanza un error
          throw new Error('Error al obtener los datos de la API');
        }

        showSnackbar('The transaction was deleted successfully', 'info');

        handleClose();
        resetValues();
      })
      .catch((error) => {
        showSnackbar('There was an error with the request', 'error');
        setLoading(false);
        console.error('Error:', error);
      });
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>New Transaction</DialogTitle>
      <DialogContent>
        <Box
          maxWidth="md"
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
                <AddIcon /> Income
              </ToggleButton>
              <ToggleButton value="EXPENSE" aria-label="expense">
                <RemoveIcon /> Expense
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
          {/* Payment Method Input */}
          <ToggleButtonGroup
            fullWidth
            color="primary"
            value={watch('paymentMethod')}
            exclusive
            onChange={(_: React.MouseEvent<HTMLElement>, value: string) => {
              if (value !== null) {
                setValue('paymentMethod', value);
              }
            }}
            aria-label="paymentMethod"
            className="toggle-button-group"
          >
            <ToggleButton value="CASH" aria-label="cash">
              <LocalAtmIcon style={{ marginRight: 5 }} /> Cash
            </ToggleButton>
            <ToggleButton value="CREDIT-CARD" aria-label="credit card">
              <CreditCardIcon style={{ marginRight: 5 }} /> Credit Card
            </ToggleButton>
            <ToggleButton value="TRANSFER" aria-label="transfer">
              <AccountBalanceIcon style={{ marginRight: 5 }} /> Transfer
            </ToggleButton>
            <ToggleButton value="OTHER" aria-label="other">
              <MoreHorizIcon style={{ marginRight: 5 }} /> Other
            </ToggleButton>
          </ToggleButtonGroup>

          {/* Category Input */}
          <FormControl fullWidth error={!!errors['category']} required>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              value={watch('category')}
              labelId="category-label"
              id="category-input"
              label="Category"
              {...register('category')}
            >
              {categories.map((category: typeof CategoryEntity) => (
                <MenuItem key={category.id} value={category.id?.toString()}>
                  {category.name}
                </MenuItem>
              ))}
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
        {transactionInfo && (
          <Button color="error" onClick={handleDelete}>
            Delete
          </Button>
        )}
        <div style={{ flex: '1 0 0' }} />
        <Button onClick={handleClose}>Cancel</Button>
        <LoadingButton onClick={handleSubmit(onSubmitHandler)} type="submit" loading={loading}>
          Save
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

export default TransactionForm;
// https://codevoweb.com/form-validation-react-hook-form-material-ui-react/
