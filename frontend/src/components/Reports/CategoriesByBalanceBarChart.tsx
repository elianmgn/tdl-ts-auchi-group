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

export default function CategoriesByBalanceBarChart() {
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
    const balanceData = generateBalanceData();
    const categories = balanceData.map((data) => data.category);
    const amounts = balanceData.map((data) => data.balance);
    setChartCategories(categories);
    setChartSeries(amounts);
  }, [transactionSummary]);

  const generateBalanceData = () => {
    return Object.entries(transactionSummary).map(([category, { balance }]) => ({
      category,
      balance,
    }));
  };

  const chartOptions: ApexOptions = {
    chart: {
      background: 'transparent',
      stacked: false,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    xaxis: {
      labels: {
        rotate: 0,
      },
    },
    labels: chartCategories,
    legend: {
      labels: {
        colors: '#FFFFFF',
      },
      show: false,
    },
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

