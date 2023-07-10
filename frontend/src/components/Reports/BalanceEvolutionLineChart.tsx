import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';
import TransactionEntity from '../../models/TransactionEntity';
import useApiService from '../../services/apiService';

type BalanceEvolutionProps = {
  transactions: TransactionEntity[];
  filters: Record<string, string>;
};

export default function BalanceEvolutionLineChart(props: BalanceEvolutionProps) {
  const { getUserBalance } = useApiService();
  const { transactions, filters } = props;
  const [balancesByDate, setBalancesByDate] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getFirstDateBalance(filters.dateFrom).then((data) => {
      const information = updateChart(transactions, filters.dateFrom, data);
      setBalancesByDate(information);
      setIsLoading(false);
    });
  }, []);

  const getFirstDateBalance = async (firstDate: string) => {
    try {
      getUserBalance({ dateTo: firstDate });

      const firstDateBalance = await getUserBalance({ dateTo: firstDate });
      const firstDateBalanceData = await firstDateBalance.json();
      return firstDateBalanceData;
    } catch (e) {
      console.error(e);
      return 0;
    }
  };

  const updateChart = (
    transactions: TransactionEntity[],
    firstDate: string,
    firstDateBalance: number,
  ) => {
    let datesWithBalances = {
      [firstDate]: firstDateBalance,
    };
    // Sort transactions by date ascending
    const transactionsSorted = transactions.sort((a, b) => (a.date > b.date ? 1 : -1));
    // Begin sum with first date balance
    let balanceSum = firstDateBalance;
    // Get balance evolution for days in which a transaction was made
    transactionsSorted.map((transaction: TransactionEntity) => {
      // Update balance sum with transaction amount
      balanceSum =
        transaction.type === 'INCOME'
          ? balanceSum + transaction.amount
          : balanceSum - transaction.amount;
      // Add date and balance to object or update balance if date already exists
      if (transaction.date in datesWithBalances) {
        datesWithBalances[transaction.date] = balanceSum;
      } else {
        datesWithBalances = {
          ...datesWithBalances,
          [transaction.date.substring(0, 10)]: balanceSum,
        };
      }
    });

    return datesWithBalances;
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
    labels: Object.keys(balancesByDate),
    legend: {
      labels: {
        colors: '#FFFFFF',
      },
      show: false,
    },
  };

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Chart
          options={chartOptions}
          series={[{ data: Object.values(balancesByDate) }]}
          type="line"
        />
      )}
    </div>
  );
}
