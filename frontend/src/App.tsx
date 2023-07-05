import './App.css';
import React from 'react';
import { UserProvider } from './contexts/UserContext';
import AppRouter from './routing/AppRouter';

function App() {
  return (
    <UserProvider>
      <AppRouter />
    </UserProvider>
  );
}

export default App;
