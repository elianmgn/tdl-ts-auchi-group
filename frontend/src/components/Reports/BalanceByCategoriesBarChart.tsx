import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';
import TransactionEntity from '../../models/TransactionEntity';
import categoryEntity from '../../models/CategoryEntity';
import { noDuplicateCategories } from './CategoriesList';

interface TransactionSummary {
  [category: string]: {
    amount: number;
    balance: number;
    description: string;
    icon: string;
    color: string;
  };
};

type BarChartProps = {
  transactions: TransactionEntity[];
};

export default function BalanceByCategoriesBarChart(props: BarChartProps) {
  const { transactions } = props;
  const [chartCategoriesColor, setChartCategoriesColor] = useState<string[]>([]);
  const [chartCategories, setChartCategories] = useState<string[]>([]);
  const [chartSeries, setChartSeries] = useState<number[]>([]);

  useEffect(() => {
    const balanceData = generateBalanceData(transactions);
    const categories = balanceData.map((data) => data.category);
    const amounts = balanceData.map((data) => data.balance);
    const categoriesColor = balanceData.map((data) => data.color);
    setChartCategories(categories);
    setChartSeries(amounts);
    setChartCategoriesColor(categoriesColor);
  }, []);

  const generateBalanceData = (transactions: TransactionEntity[]) => {
    const results: { category: string, balance: number, icon: string, color: string }[] = [];
    const categoriesInTransactions = transactions.map((transaction: TransactionEntity) => transaction.category);
    const categoriesInTransactionsNoDuplicates = noDuplicateCategories(categoriesInTransactions);
    categoriesInTransactionsNoDuplicates.forEach((category) => {
      const transactionsInCategory = transactions.filter((transaction: TransactionEntity) => transaction.category.id === category.id);
      const balance = transactionsInCategory.reduce((sum: number, transaction: TransactionEntity) => sum + transaction.amount, 0);
      const icon = category.icon;
      const color = category.color;
      results.push({ category: category.name, balance, icon, color });
    });
    
    return results;
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
    colors: chartCategoriesColor,
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

