import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface TransactionSummary {
    [category: string]: {
      amount: number;
      balance: number;
    };
  }

const ReportsPage = () => {
  const [transactionSummary, setTransactionSummary] = useState<TransactionSummary>({});

  useEffect(() => {
    fetchTransactionSummary();
  }, []);

  const fetchTransactionSummary = async () => {
    try {
      const response = await fetch(`http://localhost:8080/categories/transaction-summary`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const transactionSummary = await response.json();
      setTransactionSummary(transactionSummary);
    } catch (error) {
      console.error('Error fetching transaction summary:', error);
    }
  };

  const generateCategoryData = () => {
    return Object.entries(transactionSummary).map(([category, { amount }]) => ({
      category,
      amount,
    }));
  };
  
  const generateBalanceData = () => {
    return Object.entries(transactionSummary).map(([category, { balance }]) => ({
      category,
      balance,
    }));
  };
  

  const categoryData = generateCategoryData();
  const balanceData = generateBalanceData();

  return (
    <div>
      <h2>Categories by Amount</h2>
      <BarChart width={400} height={300} data={categoryData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="amount" fill="#8884d8" />
      </BarChart>

      <h2>Categories by Balance</h2>
      <BarChart width={400} height={300} data={balanceData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="balance" fill="#82ca9d" />
      </BarChart>
    </div>
  );
};

export default ReportsPage;
