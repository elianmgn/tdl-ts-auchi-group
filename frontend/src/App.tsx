import './App.css';
import React from 'react';
import { UserProvider } from './contexts/UserContext';
import { SnackbarProvider } from './contexts/SnackbarContext';
import AppRouter from './routing/AppRouter';

function App() {
  return (
    <SnackbarProvider>
      <UserProvider>
        <AppRouter />
      </UserProvider>
    </SnackbarProvider>
  );
}

export default App;
