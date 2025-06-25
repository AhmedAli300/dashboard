import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    return (
      <>
        <AppBar position="static" color="primary" elevation={3}>
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Box display="flex" alignItems="center" gap={2}>
              <IconButton color="inherit">
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div">
                Dashboard
              </Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={2}>
              <IconButton color="inherit">
                <NotificationsIcon />
              </IconButton>
              <Avatar alt="User" src="/static/images/avatar/1.jpg" />
              <Button
                color="inherit"
                startIcon={<LogoutIcon />}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
      </>
    );
}

export default Header;