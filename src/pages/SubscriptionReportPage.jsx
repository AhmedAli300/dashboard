import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { Line } from 'react-chartjs-2';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SubscriptionReportPage = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filteredSubscriptions, setFilteredSubscriptions] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/subscriptions')
      .then(response => {
        setSubscriptions(response.data);
        setFilteredSubscriptions(response.data);
      })
      .catch(error => {
        console.error('Error fetching subscriptions:', error);
      });
  }, []);

  const handleDateFilter = () => {
    const filtered = subscriptions.filter((subscription) => {
      const subscriptionDate = new Date(subscription.date);
      const start = startDate ? new Date(startDate) : new Date(0);
      const end = endDate ? new Date(endDate) : new Date('9999-12-31');
      return subscriptionDate >= start && subscriptionDate <= end;
    });
    setFilteredSubscriptions(filtered);
  };

  const calculateTotal = () => {
    return filteredSubscriptions.length;
  };

  const calculatePaidTotal = () => {
    return filteredSubscriptions.filter(sub => sub.paid).length;
  };

  // Prepare data for the chart
  const prepareChartData = () => {
    const dataByDate = {};
    filteredSubscriptions.forEach(sub => {
      const date = sub.date;
      dataByDate[date] = (dataByDate[date] || 0) + 1;
    });

    return {
      labels: Object.keys(dataByDate).sort(),
      datasets: [
        {
          label: 'Subscriptions',
          data: Object.values(dataByDate),
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }
      ]
    };
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Subscriptions Over Time'
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  const handleExportPDF = () => {
    // Initialize jsPDF
    const pdf = new jsPDF();
    
    // Add title
    pdf.setFontSize(16);
    pdf.text('Subscription Report', 15, 15);
    
    // Add date range if selected
    pdf.setFontSize(12);
    if (startDate || endDate) {
      pdf.text(`Period: ${startDate || 'Start'} to ${endDate || 'End'}`, 15, 25);
    }
    
    // Add summary statistics
    pdf.text(`Total Subscriptions: ${calculateTotal()}`, 15, 35);
    pdf.text(`Paid Subscriptions: ${calculatePaidTotal()}`, 15, 45);
    
    // Add table
    const tableData = filteredSubscriptions.map(sub => [
      sub.name || '',
      sub.type || '',
      sub.date || '',
      sub.paid ? 'Yes' : 'No',
      sub.notes || ''
    ]);

    // Generate table using jspdf-autotable
    autoTable(pdf, {
      head: [['Name', 'Type', 'Date', 'Paid', 'Notes']],
      body: tableData,
      startY: 55,
      theme: 'grid',
      styles: { fontSize: 10 },
      headStyles: { fillColor: [75, 192, 192] }
    });

    // Save the PDF
    pdf.save(`subscription-report-${new Date().toISOString().split('T')[0]}.pdf`);
  };

  const handleExportExcel = () => {
    const csvContent = [
      ['Name', 'Type', 'Date', 'Paid', 'Notes'],
      ...filteredSubscriptions.map(sub => [
        sub.name,
        sub.type,
        sub.date,
        sub.paid ? 'Yes' : 'No',
        sub.notes
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `subscriptions-report-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Subscription Report
        </Typography>
        
        {/* Filters */}
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
        </Box>

        {/* Summary Cards */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h6">Total Subscriptions</Typography>
              <Typography variant="h4">{calculateTotal()}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h6">Paid Subscriptions</Typography>
              <Typography variant="h4">{calculatePaidTotal()}</Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Chart */}
        <Box sx={{ mb: 3, height: 400 }}>
          <Line data={prepareChartData()} options={chartOptions} />
        </Box>

        {/* Export Buttons */}
        <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<FileDownloadIcon />}
            onClick={handleExportPDF}
          >
            Export PDF
          </Button>
          <Button
            variant="contained"
            startIcon={<FileDownloadIcon />}
            onClick={handleExportExcel}
          >
            Export Excel
          </Button>
        </Box>

        {/* Data Table */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>Notes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredSubscriptions.map((subscription) => (
                <TableRow key={subscription.id}>
                  <TableCell>{subscription.name}</TableCell>
                  <TableCell>{subscription.type}</TableCell>
                  <TableCell>{subscription.date}</TableCell>
                  <TableCell>{subscription.paid ? 'Yes' : 'No'}</TableCell>
                  <TableCell>{subscription.notes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default SubscriptionReportPage;