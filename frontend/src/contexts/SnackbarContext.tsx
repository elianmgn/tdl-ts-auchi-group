import { Snackbar, Alert, AlertColor } from '@mui/material';
import React, { createContext } from 'react';

type SnackbarContextActions = {
  showSnackbar: (text: string, typeColor: AlertColor) => void;
};

const SnackbarContext = createContext({} as SnackbarContextActions);

interface SnackbarContextProviderProps {
  children: React.ReactNode;
}

const SnackbarProvider: React.FC<SnackbarContextProviderProps> = ({ children }) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>('');
  const [typeColor, setTypeColor] = React.useState<AlertColor>('info');

  const showSnackbar = (text: string, color: AlertColor) => {
    setMessage(text);
    setTypeColor(color);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={handleClose}
      >
        <Alert variant="filled" onClose={handleClose} severity={typeColor}>
          {message}
        </Alert>
      </Snackbar>
      {children}
    </SnackbarContext.Provider>
  );
};

export { SnackbarProvider, SnackbarContext };
