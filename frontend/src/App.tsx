import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from 'react-router-dom';
import Layout from './layout/Layout';
import DashboardPage from './pages/DashboardPage';
import TransactionsPage from './pages/TransactionsPage';
import CategoriesPage from './pages/CategoriesPage';
import ReportsPage from './pages/ReportsPage';
import BudgetsPage from './pages/BudgetsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout/>}>
          
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<DashboardPage/>}/>
          <Route path="/transactions" element={<TransactionsPage/>}/>
          <Route path="/categories" element={<CategoriesPage/>}/>
          <Route path="/reports" element={<ReportsPage/>}/>
          <Route path="/budgets" element={<BudgetsPage/>}/>
        
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
