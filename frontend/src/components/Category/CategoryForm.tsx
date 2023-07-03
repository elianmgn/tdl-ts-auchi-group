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
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  FormHelperText,
} from '@mui/material';

import { LoadingButton } from '@mui/lab';

import { useForm, SubmitHandler } from 'react-hook-form';
import { object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import CategoryEntity from '../../models/CategoryEntity';
import ICONS from '../../utils/IconsEnum';
import COLORS from '../../utils/ColorsEnum';
import { Icon } from '@material-ui/core';

const formSchema = object({
  name: string().nonempty('Name is required').max(32, 'Name must be less than 32 characters'),
  description: string().nonempty('Description is required'),
  icon: string().nonempty('Icon is required'),
  color: string().nonempty('Color is required'),
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
    setValue('icon', ICONS[0]);
    setValue('color', COLORS[0]);
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
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
      } else {
        console.log(values);
        response = await fetch(`http://localhost:8080/categories/${categoryInfo.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
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
      setValue('icon', categoryInfo.icon);
      setValue('color', categoryInfo.color);
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

  const handleDelete = () => {
    setLoading(true);
    fetch(`http://localhost:8080/categories/${categoryInfo?.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        setLoading(false);
        if (!response.ok) {
          // Si la respuesta no es exitosa, lanza un error
          throw new Error('Error al obtener los datos de la API');
        }

        setAlertInfo({
          open: true,
          error: false,
          message: 'The transaction was deleted successfully.',
        });
        handleClose();
        resetValues();
      })
      .catch((error) => {
        setAlertInfo({
          open: true,
          error: true,
          message: 'There was an error with the request.',
        });
        setLoading(false);
        console.error('Error:', error);
      });
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
            <div className="customization-container">
              {/* Icon Input */}
              <FormControl fullWidth error={!!errors['icon']} required>
                <InputLabel id="icon-label">Icon</InputLabel>
                <Select
                  value={watch('icon')}
                  labelId="icon-label"
                  id="icon-input"
                  label="Icon"
                  {...register('icon')}
                >
                  {ICONS.map((icon: string) => (
                    <MenuItem key={icon} value={icon}>
                      <div
                        style={{
                          display: 'flex',
                          backgroundColor: 'gray',
                          justifyContent: 'center',
                          width: 30,
                          borderRadius: 100,
                          paddingLeft: 10,
                          paddingRight: 10,
                          paddingTop: 5,
                          paddingBottom: 5,
                        }}
                      >
                        <Icon style={{ color: 'white' }}>{icon}</Icon>
                      </div>
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{errors['icon'] ? errors['icon'].message : ''}</FormHelperText>
              </FormControl>

              {/* Color Input */}
              <FormControl fullWidth error={!!errors['icon']} required>
                <InputLabel id="color-label">Color</InputLabel>
                <Select
                  value={watch('color')}
                  labelId="color-label"
                  id="color-input"
                  label="color"
                  {...register('color')}
                >
                  {COLORS.map((color: string) => (
                    <MenuItem key={color} value={color}>
                      <div
                        style={{
                          display: 'flex',
                          backgroundColor: color,
                          flex: 1,
                          borderRadius: 100,
                          paddingLeft: 10,
                          paddingRight: 10,
                          paddingTop: 5,
                          paddingBottom: 5,
                        }}
                      >
                        <Icon style={{ color: 'white' }}>water_drop</Icon>
                      </div>
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{errors['icon'] ? errors['icon'].message : ''}</FormHelperText>
              </FormControl>
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          {categoryInfo && (
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
    </div>
  );
};

export default CategoryForm;
