import React from 'react';
import {
  Button,
  Card,
  Box,
  Grid,
  Typography,
  Divider,
  ListItem,
  ListItemText,
  List,
} from '@mui/material';
import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';
import { useNavigate } from 'react-router-dom';

function AccountBalance() {
  const navigate = useNavigate();

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
    labels: ['Categoria 1', 'Categoria 2', 'Categoria 3', 'Categoria 4'],
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

  const chartSeries = [10, 20, 25, 45];

  return (
    <Card>
      <Grid spacing={0} container>
        <Grid item xs={12} md={6}>
          <Box p={4}>
            <Typography
              sx={{
                pb: 3
              }}
              variant="h4"
              fontFamily="Segoe UI"
            >
              Account Balance
            </Typography>
            <Box>
              <Typography variant="h2" gutterBottom fontFamily="Segoe UI">
                $54,584.23
              </Typography>
              <Box
                display="flex"
                sx={{
                  py: 4
                }}
                alignItems="center"
              >
                <Box>
                  <Typography variant="h4" fontFamily="Segoe UI">+ $3,594.00</Typography>
                  <Typography variant="subtitle1" noWrap fontFamily="Segoe UI">
                    this month
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Grid container spacing={3}>
              <Grid sm item>
                <Button fullWidth variant="contained" onClick={() => navigate('/transactions')}>
                  <Typography variant="subtitle1" fontFamily="Segoe UI">
                    Add new transaction
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid
          sx={{
            position: 'relative'
          }}
          display="flex"
          alignItems="center"
          item
          xs={12}
          md={6}
        >
          <Box
            component="span"
            sx={{
              display: { xs: 'none', md: 'inline-block' }
            }}
          >
            <Divider absolute orientation="vertical" />
          </Box>
          <Box py={4} pr={4} flex={1}>
            <Grid container spacing={0}>
              <Grid
                xs={12}
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
              <Grid xs={12} sm={7} item display="flex" alignItems="center">
                <List
                    disablePadding
                    sx={{
                    width: '100%'
                    }}
                >
                  <ListItem disableGutters>
                    <ListItemText
                        primary="Categoria 1"
                        primaryTypographyProps={{ variant: 'h5', noWrap: true, fontFamily: "Segoe UI" }}
                        secondary="Detalle de la categoria 1"
                        secondaryTypographyProps={{
                        variant: 'subtitle2',
                        noWrap: true,
                        fontFamily: "Segoe UI"
                        }}
                    />
                    <Box>
                      <Typography align="right" variant="h4" noWrap fontFamily="Segoe UI">
                        +20%
                      </Typography>
                    </Box>
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemText
                      primary="Categoria 2"
                      primaryTypographyProps={{ variant: 'h5', noWrap: true, fontFamily: "Segoe UI" }}
                      secondary="Detalle de la categoria 2"
                      secondaryTypographyProps={{
                      variant: 'subtitle2',
                      noWrap: true,
                      fontFamily: "Segoe UI"
                      }}
                    />
                    <Box>
                      <Typography align="right" variant="h4" noWrap fontFamily="Segoe UI">
                        -10%
                      </Typography>
                    </Box>
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}

export default AccountBalance;