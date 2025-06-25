import React, { useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import axios from 'axios';

const CheckInPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    checkInTime: new Date(),
    notes: ''
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/checkins', formData);
      setSuccess(true);
      setError('');
      setFormData({
        name: '',
        checkInTime: new Date(),
        notes: ''
      });
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError('حدث خطأ أثناء تسجيل الدخول. حاول مرة أخرى.');
      setSuccess(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          تسجيل الدخول
        </Typography>

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            تم تسجيل الدخول بنجاح!
          </Alert>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="الاسم"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            fullWidth
          />

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              label="وقت الدخول"
              value={formData.checkInTime}
              onChange={(newValue) => setFormData(prev => ({ ...prev, checkInTime: newValue }))}
              renderInput={(params) => <TextField {...params} fullWidth required />}
            />
          </LocalizationProvider>

          <TextField
            label="ملاحظات"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            multiline
            rows={4}
            fullWidth
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            sx={{ mt: 2 }}
          >
            تسجيل الدخول
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default CheckInPage;