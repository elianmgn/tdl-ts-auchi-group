import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <div>
      LoginPage
      <Button
              onClick={() => navigate('/register')}
              sx={{ my: 2, color: 'red', display: 'block' }}
            >Register</Button>
    </div>
  );
}
