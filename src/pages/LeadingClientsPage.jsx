import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
  Snackbar,
  Alert
} from '@mui/material';

const LeadingClientsPage = () => {
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [leadingClients, setLeadingClients] = useState([]);

  useEffect(() => {
    fetchLeadingClients();
  }, []);

  const fetchLeadingClients = async () => {
    try {
      const response = await axios.get('http://localhost:5000/leadingClients');
      setLeadingClients(response.data);
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'حدث خطأ في جلب البيانات',
        severity: 'error'
      });
    }
  };

  const handleConvertToSubscriber = async (clientId) => {
    try {
      await axios.delete(`http://localhost:5000/leadingClients/${clientId}`);

      setSnackbar({
        open: true,
        message: 'تم تحويل العميل إلى مشترك بنجاح',
        severity: 'success'
      });
      
      setLeadingClients(prev => prev.filter(client => client.id !== clientId));
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'حدث خطأ أثناء تحويل العميل',
        severity: 'error'
      });
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          العملاء المحتملون
        </Typography>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>الاسم</TableCell>
                <TableCell>طريقة التواصل</TableCell>
                <TableCell>الحالة</TableCell>
                <TableCell>الإجراءات</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leadingClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>{client.name}</TableCell>
                  <TableCell>{client.method}</TableCell>
                  <TableCell>{client.status}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleConvertToSubscriber(client.id)}
                    >
                      تحويل إلى مشترك
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

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

export default LeadingClientsPage;