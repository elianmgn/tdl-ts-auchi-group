import * as React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import Layout from './Layout';
import TransactionsPage from './pages/TransactionsPage';
import ReportsPage from './pages/ReportsPage';
import BudgetsPage from './pages/BudgetsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout/>}>
          
          <Route path="/dashboard" element={<DashboardPage/>}/>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/transactions" element={<TransactionsPage/>}/>
          <Route path="/reports" element={<ReportsPage/>}/>
          <Route path="/budgets" element={<BudgetsPage/>}/>
        
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
