import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/Auth/LoginForm';

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <div>
      <LoginForm />
    </div>
  );
}
