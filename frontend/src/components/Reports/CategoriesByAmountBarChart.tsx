import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';

interface TransactionSummary {
  [category: string]: {
    amount: number;
    balance: number;
    description: string;
  };
}

export default function CategoriesByAmountBarChart() {
  const [chartCategories, setChartCategories] = useState<string[]>([]);
  const [chartSeries, setChartSeries] = useState<number[]>([]);
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

  useEffect(() => {
    const categoryData = generateCategoryData();
    const categories = categoryData.map((data) => data.category);
    const amounts = categoryData.map((data) => data.amount);
    setChartCategories(categories);
    setChartSeries(amounts);
  }, [transactionSummary]);

  const generateCategoryData = () => {
    return Object.entries(transactionSummary).map(([category, { amount, description }]) => ({
      category,
      amount,
      description,
    }));
  };

  const chartOptions: ApexOptions = {
    chart: {
      background: 'transparent',
      stacked: false,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: false
      }
    },
    labels: chartCategories,
    legend: {
      labels: {
        colors: '#FFFFFF'
      },
      show: false
    }
  };

  return (
    <Chart
      height={300}
      width={400}
      options={chartOptions}
      series={[{ data: chartSeries }]}
      type="bar"
    />
  );
}
