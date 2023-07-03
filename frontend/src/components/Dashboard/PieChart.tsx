/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
  Box,
  Grid,
  Typography,
  ListItem,
  ListItemText,
  List,
  Divider,
} from '@mui/material';
import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';

type Category = {
  createdAt: string;
  deletedAt: string;
  description: string;
  id: number;
  name: string;
  updatedAt: string;
};

const generateRandomColors = (quantity: number): string[] => {
  const colors: string[] = [];

  for (let i = 0; i < quantity; i++) {
    const color = generateRandomColor();
    colors.push(color);
  }

  return colors;
};

const generateRandomColor = (): string => {
  const letters = '0123456789ABCDEF';
  let color = '#';

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
};

const GetCategories = async () => {
  // Fetch categories from API
  try {
    const url = `http://localhost:8080/categories`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const categoriesData = await response.json();
    console.log('categoriesData: ', categoriesData);
    return categoriesData
  } catch (e) {
    console.error(e);
    return [];
  }
};

const GetExpenditureTransactions = async () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const formattedDate = `${year}-${month}-01`;

  const url = `http://localhost:8080/transactions/admin?type=EXPENSE&dateFrom=${formattedDate}`
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const transactionsData = await response.json();
  console.log('Transactions from this month: ', transactionsData);
  return transactionsData;
  };

export default function PieChart() {
  const [chartCategories, setChartCategories] = React.useState([{name: 'Loading', description: 'Loading', expenditure: 0}]);
  const [totalExpenditure, setTotalExpenditure] = React.useState(0);

  React.useEffect(() => {
    GetCategories().then(async (data) => {
      const categories = data.map((category: Category) => ({name: category.name, description: category.description}));
      GetExpenditureTransactions().then((transactions) => {
        const categoriesWithExpenditures = categories.map((category: Category) => {
          // Get this month's transactions for this category
          const transactionsForCategory = transactions.filter((transaction: any) => transaction.category.name === category.name);
          // Get total expenditure for this category
          const totalExpenditureForCategory = transactionsForCategory.reduce((sum: number, transaction: any) => sum + transaction.amount, 0);
          return {...category, expenditure: totalExpenditureForCategory};
        });
        setTotalExpenditure(categoriesWithExpenditures.reduce((sum: number, category: any) => sum + category.expenditure, 0));
        setChartCategories(categoriesWithExpenditures);
      });
    });
    GetExpenditureTransactions();
  }, []);

  const chartOptions: ApexOptions = {
    chart: {
      background: 'transparent',
      stacked: false,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '60%'
        }
      }
    },
    colors: generateRandomColors(chartCategories.length),
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val + '%';
      },
      style: {
        colors: ['#FFFFFF']
      },
      background: {
        enabled: true,
        foreColor: '#FFFFFF',
        padding: 8,
        borderRadius: 4,
        borderWidth: 0,
        opacity: 0.3,
        dropShadow: {
          enabled: true,
          top: 1,
          left: 1,
          blur: 1,
          color: '#CCCCCC',
          opacity: 0.5
        }
      },
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 1,
        color: '#CCCCCC',
        opacity: 0.5
      }
    },
    fill: {
      opacity: 1
    },
    labels: chartCategories.map((category) => (category.name)),
    legend: {
      labels: {
        colors: '#FFFFFF'
      },
      show: false
    },
    stroke: {
      width: 0
    }
  };

  return(
      <Grid container>
        <Box py={4} pr={4} flex={1}>
          <Grid container>
            <Grid item xs={12} marginLeft={5} marginBottom={2}>
              <Typography variant="h4" noWrap fontFamily="Segoe UI" fontWeight={100}>
                Current month expenditure report
              </Typography>
            </Grid>
            <Grid
                sm={5}
                item
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <Chart
                height={300}
                options={chartOptions}
                series={chartCategories.map((category) => (category.expenditure))}
                type="donut"
                />
            </Grid>
            <Grid sm={7} item display="flex" alignItems="center">
              <List
                disablePadding
                sx={{
                  width: '100%'
                }}
              >
                {
                  chartCategories.map((category, index) => (
                      <ListItem disableGutters key={index}>
                        <ListItemText
                          primary={category.name}
                          primaryTypographyProps={{ variant: 'h5', noWrap: true, fontFamily: "Segoe UI", fontWeight: 100 }}
                          secondary={category.description}
                          secondaryTypographyProps={{ noWrap: true, fontFamily: "Segoe UI", fontWeight: 200 }}
                        />
                        <Box>
                          <Typography align="right" variant="h4" noWrap fontFamily="Segoe UI" fontWeight={100} fontStyle={{ color: '#c70000' }}>
                            {"AR$ " + category.expenditure.toLocaleString()}
                          </Typography>
                        </Box>
                      </ListItem>
                    )
                  )
                }
                 <Divider component="li" />
                <ListItem disableGutters key={chartCategories.length}>
                  <ListItemText
                    primary="Total"
                    primaryTypographyProps={{ variant: 'h5', noWrap: true, fontFamily: "Segoe UI", fontWeight: 100 }}
                  />
                  <Box>
                    <Typography align="right" variant="h4" noWrap fontFamily="Segoe UI" fontWeight={100} fontStyle={{ color: '#c70000' }}>
                      {"AR$ " + totalExpenditure.toLocaleString()}
                    </Typography>
                  </Box>
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Box>
      </Grid>
  )
}