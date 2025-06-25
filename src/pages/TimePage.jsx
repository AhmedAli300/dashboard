import React, { useState } from 'react';
import { Table, Container, Badge } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const TimePage = () => {
  const [tickets] = useState([
    {
      id: 1,
      name: 'John Doe',
      ticketType: 'Monthly Pass',
      date: '2025-04-24',
      price: 99.99,
      usageStatus: 'Active'
    },
    {
      id: 2,
      name: 'Jane Smith',
      ticketType: 'Day Pass',
      date: '2025-04-24',
      price: 15.00,
      usageStatus: 'Used'
    },
    // Add more sample data here
  ]);

  const getStatusBadge = (status) => {
    const colorMap = {
      'Active': 'success',
      'Used': 'secondary',
      'Expired': 'danger',
      'Pending': 'warning'
    };
    return <Badge bg={colorMap[status] || 'primary'}>{status}</Badge>;
  };

  return (
    <Container className="py-4">
      <h2 className="mb-4">Ticket Management</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Ticket Type</th>
            <th>Date</th>
            <th>Price</th>
            <th>Usage Status</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id}>
              <td>{ticket.name}</td>
              <td>{ticket.ticketType}</td>
              <td>{new Date(ticket.date).toLocaleDateString()}</td>
              <td>${ticket.price.toFixed(2)}</td>
              <td>{getStatusBadge(ticket.usageStatus)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default TimePage;