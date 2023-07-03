import React from 'react';
import {
  Box,
  Grid,
  Typography,
  ListItem,
  ListItemText,
  List,
} from '@mui/material';
import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';

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
    const url = `http://localhost:8080/transactions/admin?type=EXPENSE`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const transactionsData = await response.json();;
    return transactionsData;
  };

export default function PieChart() {
  const [chartCategories, setChartCategories] = React.useState([{name: 'Loading', description: 'Loading', expenditures: 0, variance: '0%'}]);
  const [chartSeries, setChartSeries] = React.useState([10]);

  React.useEffect(() => {
    GetCategories().then((data) => {
      const categories: { name: string, description: string, expenditures: number, variance: string }[] = data.map((category: any) => {
        return ({name: category.name, description: category.description, expenditures: 1, variance: '0%'})
      });
      setChartCategories(categories);
    });
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
            <Grid item xs={12} marginLeft={5}>
              <Typography variant="h4" noWrap fontFamily="Segoe UI" fontWeight={100}>
                Expenditure
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
                series={chartCategories.map((category) => (category.expenditures))}
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
                          <Typography align="right" variant="h4" noWrap fontFamily="Segoe UI" fontWeight={100}>
                            {category.variance}
                          </Typography>
                        </Box>
                      </ListItem>
                    )
                  )
                }
              </List>
            </Grid>
          </Grid>
        </Box>
      </Grid>
  )
}