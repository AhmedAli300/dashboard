import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

const ReceiptsReportPage = () => {
  const [receipts, setReceipts] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filteredReceipts, setFilteredReceipts] = useState([]);

  // Sample data - Replace with your actual data fetching logic
  useEffect(() => {
    // Mock data - replace with API call
    const mockReceipts = [
      { id: 1, date: '2025-04-24', amount: 150, description: 'Membership fee' },
      { id: 2, date: '2025-04-23', amount: 200, description: 'Personal training' },
      { id: 3, date: '2025-04-22', amount: 75, description: 'Supplement purchase' },
    ];
    setReceipts(mockReceipts);
    setFilteredReceipts(mockReceipts);
  }, []);

  const handleDateFilter = () => {
    const filtered = receipts.filter((receipt) => {
      const receiptDate = new Date(receipt.date);
      const start = startDate ? new Date(startDate) : new Date(0);
      const end = endDate ? new Date(endDate) : new Date('9999-12-31');
      return receiptDate >= start && receiptDate <= end;
    });
    setFilteredReceipts(filtered);
  };

  const calculateTotal = () => {
    return filteredReceipts.reduce((sum, receipt) => sum + receipt.amount, 0);
  };

  const handleExport = () => {
    const csvContent = [
      ['Date', 'Description', 'Amount'],
      ...filteredReceipts.map(receipt => [
        receipt.date,
        receipt.description,
        receipt.amount
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `receipts-report-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Receipts Report
        </Typography>
        
        <Box sx={{ mb: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
          <TextField
            type="date"
            label="Start Date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            type="date"
            label="End Date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <Button variant="contained" onClick={handleDateFilter}>
            Filter
          </Button>
          <Button
            variant="outlined"
            startIcon={<FileDownloadIcon />}
            onClick={handleExport}
          >
            Export CSV
          </Button>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Description</TableCell>
                <TableCell align="right">Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredReceipts.map((receipt) => (
                <TableRow key={receipt.id}>
                  <TableCell>{receipt.date}</TableCell>
                  <TableCell>{receipt.description}</TableCell>
                  <TableCell align="right">${receipt.amount}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={2} align="right">
                  <strong>Total:</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>${calculateTotal()}</strong>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default ReceiptsReportPage;