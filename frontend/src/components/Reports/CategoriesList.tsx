import React, { useEffect, useState } from 'react';
import { Grid, ListItem, ListItemText, List, Box } from '@mui/material';
import { Icon } from '@material-ui/core';
import TransactionEntity from '../../models/TransactionEntity';
import categoryEntity from '../../models/CategoryEntity';

type Categories = {
  name: string;
  description: string;
  icon: string; 
  color: string;
};

type BarChartProps = {
  transactions: TransactionEntity[];
};

export function noDuplicateCategories(categoriesInTransactions: typeof categoryEntity[] ) {
  const categoriesIDs: number[] = [];
  return categoriesInTransactions.filter((category: typeof categoryEntity) => {
    if (category.id){
      if (categoriesIDs.includes(category.id)) {
        return false;
      }
      categoriesIDs.push(category.id);
      return true;
    }
  });
}

export default function CategoriesList(props: BarChartProps) {
  const { transactions } = props;
  const [chartCategories, setChartCategories] = useState<Categories[]>([]);

  useEffect(() => {
    const categoryData = generateCategoryData(transactions);
    setChartCategories(categoryData);
  }, []);

  const generateCategoryData = (transactions: TransactionEntity[]) => {
    const results: Categories[] = [];
    const categoriesInTransactions = transactions.map((transaction: TransactionEntity) => transaction.category);
    const categoriesInTransactionsNoDuplicates = noDuplicateCategories(categoriesInTransactions);    
    categoriesInTransactionsNoDuplicates.forEach((category) => {
      results.push({ name: category.name, description: category.description, icon: category.icon, color: category.color});
    });
    
    return results;
  };

  return (
    <Grid display="flex" alignItems="center">
      <List disablePadding sx={{ width: '100%' }}>
        {chartCategories.map((category, index) => {
          const itemDescription = category.description;
          const itemColor = category.color;
          const itemIcon = category.icon;
          return (
            <ListItem disableGutters key={index}>
              <Box pl={4} display="flex" alignItems="center">
                <Icon style={{ color: itemColor, fontSize: 45, marginRight: 10 }}>{itemIcon}</Icon>
                <ListItemText
                  primary={category.name}
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

