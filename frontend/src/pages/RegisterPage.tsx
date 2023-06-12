import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const navigate = useNavigate();

  return (
    <div>
      RegisterPage
      <Button onClick={() => navigate('/login')} sx={{ my: 2, color: 'red', display: 'block' }}>
        Login
      </Button>
    </div>
  );
}
