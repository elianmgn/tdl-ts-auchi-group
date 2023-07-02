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

const GetCategories = async () => {
  // Fetch categories from API
};

export default function PieChart() {
  const [chartCategories, setChartCategories] = React.useState(['Categoria 1', 'Categoria 2', 'Categoria 3', 'Categoria 4']);
  const [chartSeries, setChartSeries] = React.useState([10, 20, 25, 45]);

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
    colors: ['#ff9900', '#1c81c2', '#333', '#5c6ac0'],
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
    labels: chartCategories,
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
                series={chartSeries}
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
                  chartCategories.map((category, index) => {
                    return(
                      <ListItem disableGutters key={index}>
                        <ListItemText
                          primary={category}
                          primaryTypographyProps={{ variant: 'h5', noWrap: true, fontFamily: "Segoe UI", fontWeight: 100 }}
                          secondary={'Detalle de la ' + category}
                          secondaryTypographyProps={{ noWrap: true, fontFamily: "Segoe UI", fontWeight: 200 }}
                        />
                        <Box>
                          <Typography align="right" variant="h4" noWrap fontFamily="Segoe UI" fontWeight={100}>
                            + 20%
                          </Typography>
                        </Box>
                      </ListItem>
                    )
                  })
                }
              </List>
            </Grid>
          </Grid>
        </Box>
      </Grid>
  )
}