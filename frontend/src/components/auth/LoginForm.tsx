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
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import budgetifyLogo from '../../assets/images/logo-color.svg';

import { LoadingButton } from '@mui/lab';

import { UserContext } from '../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = object({
  username: string().nonempty('Username is required'),
  password: string().nonempty('Password is required'),
});

type RegisterInput = TypeOf<typeof formSchema>;

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

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
    logUserIn(values);
  };

  async function logUserIn(values: RegisterInput) {
    setLoading(true);
    login(values.username, values.password);
    setLoading(false);
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
      <div className="login-container">
        <div className="app-name">
          <img src={budgetifyLogo} alt="Logo" className="app-logo" />
          <p className="app-text">BUDGETIFY</p>
        </div>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmitHandler)}
          className="form-container"
        >
          {/* Username Input */}
          <TextField
            label="Username"
            fullWidth
            required
            error={!!errors['username']}
            helperText={errors['username'] ? errors['username'].message : ''}
            {...register('username')}
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
            Login
          </LoadingButton>
          {/* <Button
          onClick={() => navigate('/register')}
          sx={{ my: 2, color: 'blue', display: 'block' }}
        >
          Register
        </Button> */}
        </Box>
        <p className="register-text" onClick={() => navigate('/register')}>
          Not a member?<button>Signup</button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
// https://codevoweb.com/form-validation-react-hook-form-material-ui-react/
