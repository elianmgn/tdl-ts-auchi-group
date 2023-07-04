import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';
import TransactionEntity from '../../models/TransactionEntity';
import { noDuplicateCategories } from './CategoriesList';

type BarChartProps = {
  transactions: TransactionEntity[];
};

export default function TransactionsByCategoryBarChart(props: BarChartProps) {
  const { transactions } = props;
  const [chartCategories, setChartCategories] = useState<string[]>([]);
  const [chartSeries, setChartSeries] = useState<number[]>([]);
  const [chartCategoriesColor, setChartCategoriesColor] = useState<string[]>([]);

  useEffect(() => {
    const categoryData = generateCategoryData(transactions);
    const categories = categoryData.map((data) => data.category);
    const amounts = categoryData.map((data) => data.amount);
    const categoriesColor = categoryData.map((data) => data.color);
    setChartCategories(categories);
    setChartSeries(amounts);
    setChartCategoriesColor(categoriesColor);
  }, []);

  const generateCategoryData = (transactions: TransactionEntity[]) => {
    const results: { category: string, amount: number, description: string, icon: string, color: string }[] = [];
    const categoriesInTransactions = transactions.map((transaction: TransactionEntity) => transaction.category);
    const categoriesInTransactionsNoDuplicates = noDuplicateCategories(categoriesInTransactions);        
    categoriesInTransactionsNoDuplicates.forEach((category) => {
      const transactionsInCategory = transactions.filter((transaction: TransactionEntity) => transaction.category.id === category.id);
      const amount = transactionsInCategory.length;
      const description = category.description;
      const icon = category.icon;
      const color = category.color;
      results.push({ category: category.name, amount, description, icon, color });
    });
    
    return results;
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
    colors: chartCategoriesColor,
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
