import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography } from '@mui/material';

const StatsCards = () => {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/subscriptions')
      .then(response => {
        setSubscriptions(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <Box>
      <Typography variant="h6">Total Subscriptions: {subscriptions.length}</Typography>
      {subscriptions.length > 0 && (
        <Typography variant="h6">First Subscription Name: {subscriptions[0].name}</Typography>
      )}
      {/* يمكن إضافة المزيد من الإحصائيات حسب الحاجة */}
    </Box>
  );
};

export default StatsCards;
