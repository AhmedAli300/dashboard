import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Snackbar,
  Alert,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const ShiftSchedulePage = () => {
  const [shifts, setShifts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedShift, setSelectedShift] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const [formData, setFormData] = useState({
    employeeName: '',
    date: new Date(),
    startTime: new Date(),
    numberOfHours: '',
  });

  useEffect(() => {
    fetchShifts();
  }, []);

  const fetchShifts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/shifts');
      setShifts(response.data);
    } catch (error) {
      showSnackbar('Error loading shifts', 'error');
    }
  };

  const handleOpenDialog = (shift = null) => {
    if (shift) {
      setSelectedShift(shift);
      setFormData({
        employeeName: shift.employeeName,
        date: new Date(shift.date),
        startTime: new Date(shift.startTime),
        numberOfHours: shift.numberOfHours,
      });
    } else {
      setSelectedShift(null);
      setFormData({
        employeeName: '',
        date: new Date(),
        startTime: new Date(),
        numberOfHours: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedShift(null);
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleSubmit = async () => {
    try {
      if (selectedShift) {
        // Edit existing shift
        await axios.put(`http://localhost:5000/shifts/${selectedShift.id}`, {
          ...formData,
          id: selectedShift.id,
        });
        showSnackbar('Shift updated successfully');
      } else {
        // Add new shift
        await axios.post('http://localhost:5000/shifts', {
          ...formData,
          id: Date.now().toString(),
        });
        showSnackbar('New shift added successfully');
      }
      fetchShifts();
      handleCloseDialog();
    } catch (error) {
      showSnackbar('Error saving shift', 'error');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/shifts/${id}`);
      showSnackbar('Shift deleted successfully');
      fetchShifts();
    } catch (error) {
      showSnackbar('Error deleting shift', 'error');
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h5" gutterBottom>
            Shift Schedule
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpenDialog()}
          >
            Add New Shift
          </Button>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Employee Name</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Start Time</TableCell>
                <TableCell>Number of Hours</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {shifts.map((shift) => (
                <TableRow key={shift.id}>
                  <TableCell>{shift.employeeName}</TableCell>
                  <TableCell>
                    {new Date(shift.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(shift.startTime).toLocaleTimeString()}
                  </TableCell>
                  <TableCell>{shift.numberOfHours}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleOpenDialog(shift)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(shift.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>
            {selectedShift ? 'Edit Shift' : 'Add New Shift'}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Employee Name"
                fullWidth
                value={formData.employeeName}
                onChange={(e) =>
                  setFormData({ ...formData, employeeName: e.target.value })
                }
              />
              
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  label="Date"
                  value={formData.date}
                  onChange={(newValue) =>
                    setFormData({ ...formData, date: newValue })
                  }
                />
                <DateTimePicker
                  label="Start Time"
                  value={formData.startTime}
                  onChange={(newValue) =>
                    setFormData({ ...formData, startTime: newValue })
                  }
                />
              </LocalizationProvider>

              <TextField
                label="Number of Hours"
                type="number"
                fullWidth
                value={formData.numberOfHours}
                onChange={(e) =>
                  setFormData({ ...formData, numberOfHours: e.target.value })
                }
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained">
              {selectedShift ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            severity={snackbar.severity}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Paper>
    </Box>
  );
};

export default ShiftSchedulePage;