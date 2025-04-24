import React, { useState } from 'react'
import { Table, Container, Card } from 'react-bootstrap'

const InvitationsPage = () => {
  const [invitations] = useState([
    {
      id: 1,
      name: 'John Doe',
      date: '2025-04-24',
      used: 'No',
      source: 'Email Campaign'
    },
    {
      id: 2,
      name: 'Jane Smith',
      date: '2025-04-23',
      used: 'Yes',
      source: 'Website Registration'
    }
  ]);

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header>
          <h3>Free Invitations</h3>
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Name</th>
                <th>Date</th>
                <th>Did You Use</th>
                <th>Invitation Source</th>
              </tr>
            </thead>
            <tbody>
              {invitations.map((invitation) => (
                <tr key={invitation.id}>
                  <td>{invitation.name}</td>
                  <td>{invitation.date}</td>
                  <td>{invitation.used}</td>
                  <td>{invitation.source}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default InvitationsPage