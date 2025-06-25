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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
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
import jsPDF from 'jspdf';
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

const TradeReportPage = () => {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [ticketType, setTicketType] = useState('all');

  // Fetch tickets data (simulated)
  useEffect(() => {
    // Replace with actual API call when available
    const mockTickets = [
      { id: 1, type: 'Daily', date: '2025-04-24', amount: 15, status: 'Used' },
      { id: 2, type: 'Monthly', date: '2025-04-24', amount: 50, status: 'Active' },
      { id: 3, type: 'Daily', date: '2025-04-23', amount: 15, status: 'Used' },
      { id: 4, type: 'Monthly', date: '2025-04-22', amount: 50, status: 'Active' },
    ];
    setTickets(mockTickets);
    setFilteredTickets(mockTickets);
  }, []);

  const applyFilters = () => {
    let filtered = [...tickets];

    if (startDate || endDate) {
      filtered = filtered.filter(ticket => {
        const ticketDate = new Date(ticket.date);
        const start = startDate ? new Date(startDate) : new Date(0);
        const end = endDate ? new Date(endDate) : new Date('9999-12-31');
        return ticketDate >= start && ticketDate <= end;
      });
    }

    if (ticketType !== 'all') {
      filtered = filtered.filter(ticket => ticket.type === ticketType);
    }

    setFilteredTickets(filtered);
  };

  const resetFilters = () => {
    setStartDate('');
    setEndDate('');
    setTicketType('all');
    setFilteredTickets(tickets);
  };

  // Prepare chart data
  const prepareChartData = () => {
    const dataByDate = {};
    filteredTickets.forEach(ticket => {
      dataByDate[ticket.date] = (dataByDate[ticket.date] || 0) + 1;
    });

    return {
      labels: Object.keys(dataByDate).sort(),
      datasets: [
        {
          label: 'Tickets Sold',
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
        text: 'Tickets Over Time'
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  const handleExportPDF = () => {
    const pdf = new jsPDF();
    
    pdf.setFontSize(16);
    pdf.text('Trade Report', 15, 15);
    
    if (startDate || endDate) {
      pdf.setFontSize(12);
      pdf.text(`Period: ${startDate || 'Start'} to ${endDate || 'End'}`, 15, 25);
    }
    
    const tableData = filteredTickets.map(ticket => [
      ticket.type,
      ticket.date,
      `$${ticket.amount}`,
      ticket.status
    ]);

    autoTable(pdf, {
      head: [['Type', 'Date', 'Amount', 'Status']],
      body: tableData,
      startY: 35,
      theme: 'grid',
      styles: { fontSize: 10 },
      headStyles: { fillColor: [75, 192, 192] }
    });

    pdf.save(`trade-report-${new Date().toISOString().split('T')[0]}.pdf`);
  };

  const handleExportExcel = () => {
    const csvContent = [
      ['Type', 'Date', 'Amount', 'Status'],
      ...filteredTickets.map(ticket => [
        ticket.type,
        ticket.date,
        ticket.amount,
        ticket.status
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `trade-report-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Trade Report
        </Typography>
        
        {/* Filters */}
        <Box sx={{ mb: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={3}>
              <TextField
                type="date"
                label="Start Date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                type="date"
                label="End Date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <InputLabel>Ticket Type</InputLabel>
                <Select
                  value={ticketType}
                  onChange={(e) => setTicketType(e.target.value)}
                  label="Ticket Type"
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="Daily">Daily</MenuItem>
                  <MenuItem value="Monthly">Monthly</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button variant="contained" onClick={applyFilters} fullWidth>
                  Apply Filters
                </Button>
                <Button variant="outlined" onClick={resetFilters}>
                  Reset
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>

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
            Export CSV
          </Button>
        </Box>

        {/* Data Table */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell>{ticket.type}</TableCell>
                  <TableCell>{ticket.date}</TableCell>
                  <TableCell>${ticket.amount}</TableCell>
                  <TableCell>{ticket.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default TradeReportPage;