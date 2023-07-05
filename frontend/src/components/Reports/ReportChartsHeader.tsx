import React from 'react';
import {
  AppBar,
  Button,
} from '@mui/material';
import './ReportChartsHeader.css';

interface ComponentProps {
  handleFilterChange: (filterName: string, value: string | null) => void;
}

function ReportChartsHeader({ handleFilterChange }: ComponentProps) {
  const today = new Date();

  const handleCurrentMonth = () => {
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const firstMonthDayFormatted = `${year}-${month}-01`;
    handleFilterChange('dateFrom', firstMonthDayFormatted);
  };

  const handleLastXMonths = (monthNumber: number) => {
    const fromDate = new Date(today);
    fromDate.setMonth(fromDate.getMonth() - monthNumber);
    const year = fromDate.getFullYear();
    const month = (fromDate.getMonth() + 1).toString().padStart(2, '0');
    const day = fromDate.getDate().toString().padStart(2, '0');
    const fromDateFormatted = `${year}-${month}-${day}`;
    handleFilterChange('dateFrom', fromDateFormatted);
  };

  const handleLastYear = () => {
    const fromDate = new Date(today);
    fromDate.setFullYear(fromDate.getFullYear() - 1);
    const year = fromDate.getFullYear();
    const month = (fromDate.getMonth() + 1).toString().padStart(2, '0');
    const day = fromDate.getDate().toString().padStart(2, '0');
    const fromDateFormatted = `${year}-${month}-${day}`;
    handleFilterChange('dateFrom', fromDateFormatted);
  };

  return (
    <AppBar position="static" style={{ background: '#f5f5f5' }}>
      <div className="header-container">
        {/* Filter controls */}
        <div className="filter-container">
          {/* Date filters */}
          <Button variant="outlined" onClick={() => handleCurrentMonth()}>Current Month</Button>
          <Button variant="outlined" onClick={() => handleLastXMonths(3)}>Last 3 months</Button>
          <Button variant="outlined" onClick={() => handleLastXMonths(6)}>Last 6 months</Button>
          <Button variant="outlined" onClick={() => handleLastYear()}>Last year</Button>
        </div>
        {/* </Toolbar> */}
      </div>
    </AppBar>
  );
}

export default ReportChartsHeader;