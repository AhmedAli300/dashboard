import React from 'react';
import { Link } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ReportIcon from '@mui/icons-material/Assessment';
import CountertopsIcon from '@mui/icons-material/Countertops';
import LogoutIcon from '@mui/icons-material/Logout';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const drawerWidth = 240;

const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#1976d2',
          color: '#fff',
        },
      }}
    >
      <Box p={2}>
        <Typography variant="h6" noWrap component="div">
          My Dashboard
        </Typography>
      </Box>
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/dashboard">
            <ListItemIcon sx={{ color: 'white' }}><DashboardIcon /></ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/subscriptions">
            <ListItemIcon sx={{ color: 'white' }}><PeopleIcon /></ListItemIcon>
            <ListItemText primary="Subscriptions" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/subscriptions/add">
            <ListItemIcon sx={{ color: 'white' }}><PeopleIcon /></ListItemIcon>
            <ListItemText primary="Add/Edit Subscription" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/receipts">
            <ListItemIcon sx={{ color: 'white' }}><ReceiptIcon /></ListItemIcon>
            <ListItemText primary="Receipts" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/time">
            <ListItemIcon sx={{ color: 'white' }}><AccessTimeIcon /></ListItemIcon>
            <ListItemText primary="Time" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/check-in">
            <ListItemIcon sx={{ color: 'white' }}><EventAvailableIcon /></ListItemIcon>
            <ListItemText primary="Check-in" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/check-out">
            <ListItemIcon sx={{ color: 'white' }}><LogoutIcon /></ListItemIcon>
            <ListItemText primary="Check-out" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/invitations">
            <ListItemIcon sx={{ color: 'white' }}><GroupAddIcon /></ListItemIcon>
            <ListItemText primary="Invitations" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/leading-clients">
            <ListItemIcon sx={{ color: 'white' }}><AssignmentIndIcon /></ListItemIcon>
            <ListItemText primary="Leading Clients" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/employee-salaries">
            <ListItemIcon sx={{ color: 'white' }}><MonetizationOnIcon /></ListItemIcon>
            <ListItemText primary="Employee Salaries" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/shift-schedule">
            <ListItemIcon sx={{ color: 'white' }}><CalendarTodayIcon /></ListItemIcon>
            <ListItemText primary="Shift Schedule" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/subscription-report">
            <ListItemIcon sx={{ color: 'white' }}><ReportIcon /></ListItemIcon>
            <ListItemText primary="Subscription Report" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/trade-report">
            <ListItemIcon sx={{ color: 'white' }}><ReportIcon /></ListItemIcon>
            <ListItemText primary="Trade Report" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/receipts-report">
            <ListItemIcon sx={{ color: 'white' }}><ReportIcon /></ListItemIcon>
            <ListItemText primary="Receipts Report" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/count">
            <ListItemIcon sx={{ color: 'white' }}><CountertopsIcon /></ListItemIcon>
            <ListItemText primary="Count" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
