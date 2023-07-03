import React from 'react';
import {
  FormControl,
  MenuItem,
  AppBar,
  InputLabel,
  Select,
  TextField,
  Button,
} from '@mui/material';
import AssessmentIcon from '@mui/icons-material/Assessment';
import './ReportChartsHeader.css';

interface ComponentProps {
  filters: Record<string, string>;
  handleFilterChange: (filterName: string, value: string | null) => void;
  handleGenerateReports: () => void;
}

function ReportChartsHeader({ filters, handleFilterChange, handleGenerateReports }: ComponentProps) {
  return (
    <AppBar position="static" style={{ background: '#f5f5f5' }}>
      <div className="header-container">
        {/* Controles de filtrado */}
        <div className="filter-container">
          {/* Date */}
          <TextField
            variant="standard"
            label="From"
            type="date"
            value={filters.dateFrom}
            onChange={(event) => handleFilterChange('dateFrom', event.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            variant="standard"
            label="To"
            type="date"
            value={filters.dateTo}
            onChange={(event) => handleFilterChange('dateTo', event.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>

        {/* Botón de agregar */}
        <div>
          <Button variant="contained" onClick={handleGenerateReports} startIcon={<AssessmentIcon />}>
            Generate Reports
          </Button>
        </div>
        {/* </Toolbar> */}
      </div>
    </AppBar>
  );
}

export default ReportChartsHeader;