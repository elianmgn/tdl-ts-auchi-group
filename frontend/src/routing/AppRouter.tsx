import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Layout from '../layout/Layout';
import AuthLayout from '../layout/AuthLayout';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import DashboardPage from '../pages/DashboardPage';
import TransactionsPage from '../pages/TransactionsPage';
import CategoriesPage from '../pages/CategoriesPage';
import ReportsPage from '../pages/ReportsPage';
import { UserContext } from '../contexts/UserContext';
import { CircularProgress } from '@mui/material';

function AppRouter() {
  const { currentUser, isLoading } = React.useContext(UserContext);
  return (
    <div>
      {isLoading ? (
        <CircularProgress sx={{ position: 'absolute', top: '50%', left: '50%' }} />
      ) : (
        <Router>
          {currentUser ? (
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/transactions" element={<TransactionsPage />} />
                <Route path="/categories" element={<CategoriesPage />} />
                <Route path="/reports" element={<ReportsPage />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Route>
            </Routes>
          ) : (
            <Routes>
              <Route element={<AuthLayout />}>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Route>
            </Routes>
          )}
        </Router>
      )}
    </div>
  );
}

export default AppRouter;
