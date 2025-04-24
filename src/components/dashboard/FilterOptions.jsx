// src/components/dashboard/FilterOptions.jsx
import React, { useState } from "react";
import { Box, TextField, Button, MenuItem, Select, InputLabel, FormControl } from "@mui/material";

const FilterOptions = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    dateRange: "",
    subscriptionType: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Call the parent component's filter change function
    onFilterChange({ ...filters, [name]: value });
  };

  return (
    <Box sx={{ p: 3, backgroundColor: "#fff", borderRadius: 2, boxShadow: 3 }}>
      <FormControl fullWidth>
        <InputLabel>Subscription Type</InputLabel>
        <Select
          name="subscriptionType"
          value={filters.subscriptionType}
          onChange={handleFilterChange}
          label="Subscription Type"
        >
          <MenuItem value="monthly">Monthly</MenuItem>
          <MenuItem value="annual">Annual</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label="Date Range"
        type="date"
        name="dateRange"
        value={filters.dateRange}
        onChange={handleFilterChange}
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        sx={{ mt: 2 }}
      />

      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        fullWidth
        onClick={() => onFilterChange(filters)}
      >
        Apply Filters
      </Button>
    </Box>
  );
};

export default FilterOptions;
