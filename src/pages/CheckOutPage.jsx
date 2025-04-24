import React from 'react';
import { Box, Paper, Typography, Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../context/AuthContext';

const CheckOutPage = () => {
  const { logout, user } = useAuth();

  const handleSignOut = () => {
    logout();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80vh'
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: 400,
          width: '100%'
        }}
      >
        <LogoutIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
        <Typography variant="h5" gutterBottom>
          Sign Out
        </Typography>
        {user && (
          <Typography variant="body1" color="text.secondary" mb={3}>
            Currently signed in as: {user.username}
          </Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<LogoutIcon />}
          onClick={handleSignOut}
          fullWidth
        >
          Sign Out
        </Button>
      </Paper>
    </Box>
  );
};

export default CheckOutPage;