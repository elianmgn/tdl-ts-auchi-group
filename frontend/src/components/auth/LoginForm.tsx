import React, { useEffect, useState, useContext } from 'react';
import './LoginForm.css';
import {
  Box,
  FormHelperText,
  TextField,
  FormControl,
  InputLabel,
  IconButton,
  OutlinedInput,
  InputAdornment,
  Alert,
  Snackbar,
  Button,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { LoadingButton } from '@mui/lab';

import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = object({
  email: string().email().nonempty('Email is required'),
  password: string().nonempty('Password is required'),
});

type RegisterInput = TypeOf<typeof formSchema>;

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [alertInfo, setAlertInfo] = useState({ open: false, error: false, message: '' });
  const [showPassword, setShowPassword] = React.useState(false);

  // Handle Password Visibility
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  // Handle Alert
  const handleCloseAlert = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlertInfo({ open: false, error: alertInfo['error'], message: alertInfo['message'] });
  };

  // Handle Form
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<RegisterInput>({
    resolver: zodResolver(formSchema),
  });

  const resetValues = () => {
    reset();
  };

  // Handle Submit
  const onSubmitHandler: SubmitHandler<RegisterInput> = (values) => {
    console.log('Values:');
    logUserIn(values);
    console.log(values);
  };

  async function logUserIn(values: RegisterInput) {
    setLoading(true);
    try {
      const response = await login(values.email, values.password);

      //   if (!response.ok) {
      //     // Si la respuesta no es exitosa, lanza un error
      //     throw new Error('Error al obtener los datos de la API');
      //   }

      // const data = await response.json();

      //   setLoading(false);
      setAlertInfo({
        open: true,
        error: false,
        message: 'The transaction was saved successfully.',
      });
    } catch (error) {
      setAlertInfo({ open: true, error: true, message: 'There was an error with the request.' });
      setLoading(false);
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    setLoading(false);
    resetValues();
  }, []);

  return (
    <div className="container">
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
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmitHandler)}
        className="form-container"
      >
        {/* Email Input */}
        <TextField
          label="Email"
          fullWidth
          required
          error={!!errors['email']}
          helperText={errors['email'] ? errors['email'].message : ''}
          {...register('email')}
        />
        {/* Password Input */}
        <FormControl variant="outlined" required fullWidth error={!!errors['password']}>
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            {...register('password')}
          />
          <FormHelperText>{errors['password'] ? errors['password'].message : ''}</FormHelperText>
        </FormControl>
        <LoadingButton
          variant="contained"
          onClick={handleSubmit(onSubmitHandler)}
          type="submit"
          loading={loading}
        >
          Save
        </LoadingButton>
        <Button
          onClick={() => navigate('/register')}
          sx={{ my: 2, color: 'red', display: 'block' }}
        >
          Register
        </Button>
      </Box>
    </div>
  );
};

export default LoginForm;
// https://codevoweb.com/form-validation-react-hook-form-material-ui-react/
