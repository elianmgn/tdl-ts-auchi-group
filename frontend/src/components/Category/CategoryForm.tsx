import React, { useEffect, useState } from 'react';
import './CategoryForm.css';
import {
  Box,
  TextField,
  Alert,
  Snackbar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';

import { LoadingButton } from '@mui/lab';

import { useForm, SubmitHandler } from 'react-hook-form';
import { object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import CategoryEntity from '../../models/CategoryEntity';

const formSchema = object({
  name: string()
    .nonempty('Name is required')
    .max(32, 'Name must be less than 32 characters'),
  description: string().nonempty('Description is required'),
});

type RegisterInput = TypeOf<typeof formSchema>;

interface ComponenteProps {
  open: boolean;
  handleClose: () => void;
  categoryInfo?: typeof CategoryEntity | null;
}

const CategoryForm: React.FC<ComponenteProps> = ({ open, handleClose, categoryInfo }) => {
  const [loading, setLoading] = useState(false);
  const [alertInfo, setAlertInfo] = useState({ open: false, error: false, message: '' });

  const {
    register,
    setValue,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<RegisterInput>({
    resolver: zodResolver(formSchema),
  });

  const resetValues = () => {
    reset();
  };

  const handleCloseAlert = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlertInfo({ open: false, error: alertInfo['error'], message: alertInfo['message'] });
  };

  async function postNewCategory(values: RegisterInput) {
    setLoading(true);
    try {
      let response;
      if (!categoryInfo) {
        response = await fetch('http://localhost:8080/categories/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values),
        });
      } else {
        response = await fetch(`http://localhost:8080/categories/${categoryInfo.id}`, {
          method: 'PUT',
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
        message: 'The category was saved successfully.',
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
    if (categoryInfo) {
      setValue('name', categoryInfo.name);
      setValue('description', categoryInfo.description);
    } else {
      resetValues();
    }
    setLoading(false);
  }, [open]);

  const onSubmitHandler: SubmitHandler<RegisterInput> = (values) => {
    console.log('Values:');
    postNewCategory(values);
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
        <DialogTitle>Category</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmitHandler)}
            className="form-container"
          >
            {/* Name Input */}
            <TextField
              label="Name"
              fullWidth
              required
              error={!!errors['name']}
              helperText={errors['name'] ? errors['name'].message : ''}
              {...register('name')}
            />

            {/* Description Input */}
            <TextField
              label="Description"
              fullWidth
              required
              error={!!errors['description']}
              helperText={errors['description'] ? errors['description'].message : ''}
              {...register('description')}
            />
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

export default CategoryForm;
