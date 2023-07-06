import React, { useEffect, useState, useContext } from 'react';
import './CategoryForm.css';
import {
  Box,
  TextField,
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
import useApiService from '../../services/apiService';
import { SnackbarContext } from '../../contexts/SnackbarContext';

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
  const { postUserCategory, putUserCategory, deleteUserCategory } = useApiService();
  const { showSnackbar } = useContext(SnackbarContext);
  const [loading, setLoading] = useState(false);

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

  const onSubmitHandler: SubmitHandler<RegisterInput> = async (values) => {
    setLoading(true);
    try {
      let response;
      if (categoryInfo) {
        const categoryId = categoryInfo?.id?.toString() || '';
        response = await putUserCategory(categoryId, JSON.stringify(values));
      } else {
        response = await postUserCategory(JSON.stringify(values));
      }

      if (!response.ok) {
        // Si la respuesta no es exitosa, lanza un error
        throw new Error('Error al obtener los datos de la API');
      }

      setLoading(false);
      window.location.reload();
      
      showSnackbar('The category was saved successfully', 'success');
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
    deleteUserCategory(categoryInfo?.id?.toString() || '')
      .then((response) => {
        setLoading(false);
        if (!response.ok) {
          // Si la respuesta no es exitosa, lanza un error
          throw new Error('Error al obtener los datos de la API');
        }
        showSnackbar('The category was deleted successfully', 'info');
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
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>New Category</DialogTitle>
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
                    <div className="icon-input">
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
                    <div className="color-input" style={{ backgroundColor: color }}>
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
  );
};

export default CategoryForm;
