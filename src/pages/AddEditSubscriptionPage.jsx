import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Box, TextField, Checkbox, FormControlLabel, Button, Typography, TextareaAutosize,
  FormControl, InputLabel, Select, MenuItem
} from '@mui/material';

const AddEditSubscriptionPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    name: '',
    type: '',
    date: '',
    paid: false,
    notes: '',
  });

  useEffect(() => {
    if (isEdit) {
      axios.get(`http://localhost:5000/subscriptions/${id}`)
        .then(res => setFormData(res.data))
        .catch(err => console.error('Error loading subscription:', err));
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEdit) {
      axios.put(`http://localhost:5000/subscriptions/${id}`, formData)
        .then(() => {
          alert('Subscription updated!');
          navigate('/subscriptions');
        })
        .catch(err => console.error('Error updating:', err));
    } else {
      axios.post('http://localhost:5000/subscriptions', formData)
        .then(() => {
          alert('Subscription added!');
          navigate('/subscriptions');
        })
        .catch(err => console.error('Error adding:', err));
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 600, margin: 'auto', mt: 4, p: 3, border: '1px solid #ddd',
        borderRadius: 2, boxShadow: 2, backgroundColor: '#fff',
      }}
    >
      <Typography variant="h5" gutterBottom>
        {isEdit ? 'Edit Subscription' : 'Add Subscription'}
      </Typography>

      <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
        <TextField 
          name="name" 
          label="Name" 
          value={formData.name} 
          onChange={handleChange} 
          fullWidth 
        />
        
        <FormControl fullWidth>
          <InputLabel id="subscription-type-label">Subscription Type</InputLabel>
          <Select
            labelId="subscription-type-label"
            name="type"
            value={formData.type}
            label="Subscription Type"
            onChange={handleChange}
          >
            <MenuItem value="Monthly">Monthly</MenuItem>
            <MenuItem value="Annual">Annual</MenuItem>
          </Select>
        </FormControl>

        <TextField
          name="date"
          label="Date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
        
        <FormControlLabel
          control={<Checkbox name="paid" checked={formData.paid} onChange={handleChange} />}
          label="Paid"
        />
        
        <TextareaAutosize
          name="notes"
          placeholder="Notes"
          value={formData.notes}
          onChange={handleChange}
          minRows={4}
          style={{ width: '100%', padding: 10, borderRadius: 4, borderColor: '#ccc' }}
        />
        
        <Button type="submit" variant="contained" color="primary">
          {isEdit ? 'Update' : 'Save'}
        </Button>
      </Box>
    </Box>
  );
};

export default AddEditSubscriptionPage;
