import React, { useEffect, useState } from 'react';
import { Grid, ListItem, ListItemText, List, Box, ListItemIcon } from '@mui/material';
import { Icon } from '@material-ui/core';

interface TransactionSummary {
  [category: string]: {
    amount: number;
    balance: number;
    description: string;
    icon: string;
    color: string;
  };
}

export default function CategoriesList() {
  const [chartCategories, setChartCategories] = useState<string[]>([]);
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
    setChartCategories(categories);
  }, [transactionSummary]);

  const generateCategoryData = () => {
    return Object.entries(transactionSummary).map(([category, { amount, description, icon, color}]) => ({
      category,
      amount,
      description,
      icon,
      color
    }));
  };

  return (
    <Grid display="flex" alignItems="center">
      <List disablePadding sx={{ width: '100%' }}>
        {chartCategories.map((category, index) => {
          const itemDescription = generateCategoryData()[index].description;
          const itemColor = generateCategoryData()[index].color;
          const itemIcon = generateCategoryData()[index].icon;
          return (
            <ListItem disableGutters key={index}>
              <Box pl={4} display="flex" alignItems="center">
                <Icon style={{ color: itemColor, fontSize: 45, marginRight: 10 }}>{itemIcon}</Icon>
                <ListItemText
                  primary={category}
                  primaryTypographyProps={{ variant: 'h5', noWrap: true, fontFamily: 'Segoe UI', fontWeight: 100 }}
                  secondary={itemDescription}
                  secondaryTypographyProps={{ noWrap: true, fontFamily: 'Segoe UI', fontWeight: 200 }}
                />
              </Box>
            </ListItem>
          );
        })}
      </List>
    </Grid>
  );
}

