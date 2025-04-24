import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Box,
  Typography
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PrintIcon from '@mui/icons-material/Print';

const ReceiptsPage = () => {
  // Sample data - replace with your actual data source
  const [receipts, setReceipts] = useState([
    {
      id: 1,
      number: 'RCP001',
      name: 'John Doe',
      transactionType: 'Payment',
      amount: 150.00,
    },
    {
      id: 2,
      number: 'RCP002',
      name: 'Jane Smith',
      transactionType: 'Refund',
      amount: 75.50,
    },
  ]);

  const handlePrint = (id) => {
    // Implement print functionality
    console.log('Print receipt:', id);
  };

  const handleEdit = (id) => {
    // Implement edit functionality
    console.log('Edit receipt:', id);
  };

  const handleDelete = (id) => {
    // Implement delete functionality
    setReceipts(receipts.filter(receipt => receipt.id !== id));
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Receipts
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Number</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Transaction Type</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {receipts.map((receipt) => (
              <TableRow key={receipt.id}>
                <TableCell>{receipt.number}</TableCell>
                <TableCell>{receipt.name}</TableCell>
                <TableCell>{receipt.transactionType}</TableCell>
                <TableCell>${receipt.amount.toFixed(2)}</TableCell>
                <TableCell align="center">
                  <IconButton
                    color="primary"
                    onClick={() => handlePrint(receipt.id)}
                    size="small"
                  >
                    <PrintIcon />
                  </IconButton>
                  <IconButton
                    color="primary"
                    onClick={() => handleEdit(receipt.id)}
                    size="small"
                  >
                    {/* <EditIcon /> */}
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(receipt.id)}
                    size="small"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ReceiptsPage;