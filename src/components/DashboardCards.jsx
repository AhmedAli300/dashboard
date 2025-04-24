import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import BarChartIcon from '@mui/icons-material/BarChart';


const cardData = [
  {
    title: 'Users',
    value: '1,024',
    icon: <PeopleIcon fontSize="large" />,
    color: '#1976d2',
  },
  {
    title: 'Orders',
    value: '256',
    icon: <ShoppingCartIcon fontSize="large" />,
    color: '#9c27b0',
  },
  {
    title: 'Revenue',
    value: '$12,345',
    icon: <MonetizationOnIcon fontSize="large" />,
    color: '#2e7d32',
  },
  {
    title: 'Performance',
    value: '87%',
    icon: <BarChartIcon fontSize="large" />,
    color: '#ff9800',
  },
];
export const DashboardCards = () => {
  return (
    <>
      <Grid container spacing={3}>
      {cardData.map((card, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card sx={{ display: 'flex', alignItems: 'center', padding: 2 }}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle2" color="text.secondary">
                {card.title}
              </Typography>
              <Typography variant="h6">{card.value}</Typography>
            </CardContent>
            <div style={{ color: card.color }}>{card.icon}</div>
          </Card>
        </Grid>
      ))}
    </Grid>

    </>
  )
}

export default DashboardCards;