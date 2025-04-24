import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const CountPage = () => {
  const [branches, setBranches] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingBranch, setEditingBranch] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    manager: ''
  });

  const loadBranches = async () => {
    try {
      const response = await axios.get('http://localhost:5000/branches');
      setBranches(response.data);
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Error loading branches',
        severity: 'error'
      });
    }
  };

  useEffect(() => {
    loadBranches();
  }, []);

  const saveBranchesToFile = async (branch, isEdit = false) => {
    try {
      if (isEdit) {
        await axios.put(`http://localhost:5000/branches/${branch.id}`, branch);
      } else {
        await axios.post('http://localhost:5000/branches', branch);
      }
      loadBranches();
      setSnackbar({
        open: true,
        message: isEdit ? 'Branch updated successfully' : 'Branch added successfully',
        severity: 'success'
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Error saving changes',
        severity: 'error'
      });
    }
  };

  const handleOpen = (branch = null) => {
    if (branch) {
      setFormData(branch);
      setEditingBranch(branch);
    } else {
      setFormData({
        name: '',
        address: '',
        phone: '',
        manager: ''
      });
      setEditingBranch(null);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingBranch(null);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.address || !formData.phone || !formData.manager) {
      setSnackbar({
        open: true,
        message: 'Please fill in all fields',
        severity: 'warning'
      });
      return;
    }

    const branchData = editingBranch 
      ? { ...formData, id: editingBranch.id }
      : { ...formData, id: Date.now().toString() };

    await saveBranchesToFile(branchData, !!editingBranch);
    handleClose();
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/branches/${id}`);
      loadBranches();
      setSnackbar({
        open: true,
        message: 'Branch deleted successfully',
        severity: 'success'
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Error deleting branch',
        severity: 'error'
      });
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h5">Branch Management</Typography>
          <Button variant="contained" color="primary" onClick={() => handleOpen()}>
            Add New Branch
          </Button>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Branch Name</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Manager</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {branches.map((branch) => (
                <TableRow key={branch.id}>
                  <TableCell>{branch.name}</TableCell>
                  <TableCell>{branch.address}</TableCell>
                  <TableCell>{branch.phone}</TableCell>
                  <TableCell>{branch.manager}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleOpen(branch)} color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(branch.id)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{editingBranch ? 'Edit Branch' : 'Add New Branch'}</DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                name="name"
                label="Branch Name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                name="address"
                label="Address"
                value={formData.address}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                name="phone"
                label="Phone"
                value={formData.phone}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                name="manager"
                label="Manager"
                value={formData.manager}
                onChange={handleChange}
                fullWidth
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained">
              {editingBranch ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
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
    </Box>
  );
};

// export { CountPage };
export default CountPage;