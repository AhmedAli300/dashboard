
import React, { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import StatsCards from "../components/dashboard/StatsCards";
import SubscriptionsChart from "../components/dashboard/SubscriptionsChart";
import RecentTransactions from "../components/dashboard/RecentTransactions";
import QuickActions from "../components/dashboard/QuickActions";
import FilterOptions from "../components/dashboard/FilterOptions";

const DashboardPage = () => {
  const [filters, setFilters] = useState({});

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    // هنا ممكن نقوم بعمل API Call لفلترة البيانات بناءً على الفلاتر الجديدة.
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" mb={3}>
        Club Overview
      </Typography>

      {/* Filter Options */}
      <Box mb={3}>
        <FilterOptions onFilterChange={handleFilterChange} />
      </Box>

      {/* Stats Cards */}
      <Box mb={3}>
        <StatsCards />
      </Box>

      {/* Subscriptions Chart and Recent Transactions */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} md={8}>
          <SubscriptionsChart filters={filters} />
        </Grid>
        <Grid item xs={12} md={4}>
          <RecentTransactions filters={filters} />
        </Grid>
      </Grid>

      {/* Quick Actions */}
      <Box>
        <QuickActions />
      </Box>
    </Box>
  );
};

export default DashboardPage;
