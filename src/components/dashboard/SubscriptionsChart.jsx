// SubscriptionsChart.jsx
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

const SubscriptionsChart = ({ filters }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // استدعاء API لتحميل البيانات بناءً على الفلاتر
    axios.get('/api/subscriptions', { params: filters })
      .then(response => {
        if (response.data && Array.isArray(response.data)) {
          setData(response.data);
        } else {
          console.error('Invalid data format received', response.data);
        }
      })
      .catch(err => {
        console.error('Error fetching subscriptions data', err);
      });
  }, [filters]);

  if (!data) {
    return <div>Loading...</div>;
  }

  const chartData = {
    labels: data.map(item => item.date), // تأكد من أن "data" هو مصفوفة
    datasets: [
      {
        label: 'Subscriptions',
        data: data.map(item => item.value),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  return <Line data={chartData} />;
};

export default SubscriptionsChart;
