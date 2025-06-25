import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const EmployeeSalariesPage = () => {
  const [employees, setEmployees] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    role: '',
    status: '',
    salary: '',
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    axios.get('http://localhost:5000/employees')
      .then(response => setEmployees(response.data))
      .catch(error => console.error('Error fetching employees:', error));
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setEditFormData({
      name: employee.name,
      role: employee.role,
      status: employee.status,
      salary: employee.salary,
    });
    setEditDialogOpen(true);
  };

  const handleDelete = (employee) => {
    setSelectedEmployee(employee);
    setDeleteDialogOpen(true);
  };

  const handleEditSubmit = async () => {
    try {
      await axios.put(`http://localhost:5000/employees/${selectedEmployee.id}`, editFormData);
      fetchEmployees();
      setEditDialogOpen(false);
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`http://localhost:5000/employees/${selectedEmployee.id}`);
      fetchEmployees();
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleEditFormChange = (event) => {
    const { name, value } = event.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Club Staff Data
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Salary</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.role}</TableCell>
                <TableCell>
                  <span style={{
                    padding: '6px 12px',
                    borderRadius: '16px',
                    backgroundColor: employee.status === 'Active' ? '#e8f5e9' : '#ffebee',
                    color: employee.status === 'Active' ? '#2e7d32' : '#c62828'
                  }}>
                    {employee.status}
                  </span>
                </TableCell>
                <TableCell>${employee.salary}</TableCell>
                <TableCell align="center">
                  <IconButton
                    color="primary"
                    onClick={() => handleEdit(employee)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(employee)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Employee</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="name"
            label="Name"
            fullWidth
            value={editFormData.name}
            onChange={handleEditFormChange}
          />
          <TextField
            margin="dense"
            name="role"
            label="Role"
            fullWidth
            value={editFormData.role}
            onChange={handleEditFormChange}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={editFormData.status}
              onChange={handleEditFormChange}
              label="Status"
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            name="salary"
            label="Salary"
            fullWidth
            type="number"
            value={editFormData.salary}
            onChange={handleEditFormChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleEditSubmit} color="primary">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete Employee</DialogTitle>
        <DialogContent>
          Are you sure you want to delete {selectedEmployee?.name}?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EmployeeSalariesPage;