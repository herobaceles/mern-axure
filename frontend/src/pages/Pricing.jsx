import React from 'react';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
 

function Pricing() {
  const amenities = [
    'Man-made Beach',
    'Wave Pool',
    'Sand Bar (open until 11 PM)',
    'Kiddie Beach Playground',
    'Paris Beach Club (Dining Area, Lockers & Showers)',
    'Sky Garden (7 AM–10 PM only, no food allowed)',
    'Convenience stores (7-Eleven, Food Stalls)',
    'BDO ATM Machines',
    'Paid Laundry Services',
    'Pay Parking',
    '24/7 Security Assistance',
  ];

  const pool = [
    'Pool Shifts: 7 AM–12 NN, 2 PM–7 PM',
    'Pool Fee: ₱250 per head (per shift)',
    'Kids below 3 ft are FREE',
    'Note: Pool closed every Monday for maintenance (unless Holiday)',
    'Strictly swimming attire only',
  ];

  const rules = [
    'No pets allowed',
    'No smoking inside the units',
    'No rescheduling or cancellations',
    'Light cooking only',
    'Bring at least 1 valid ID for check-in',
  ];

  return (
    <div className="pricing-section">
      <Container className="py-4 text-dark">
        <h3 className="text-center fs-5 mb-3">Staycation Amenities & Rules</h3>

        <Row className="g-2 mb-3">
          <Col md={4}>
            <Card className="transparent-card compact-card p-2">
              <Card.Body>
                <Card.Title className="fs-6">Amenities for All Units</Card.Title>
                <ListGroup variant="flush" className="small">
                  {amenities.map((a, i) => (
                    <ListGroup.Item key={i} className="py-1 px-2">{a}</ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="transparent-card compact-card p-2">
              <Card.Body>
                <Card.Title className="fs-6">Pool Access</Card.Title>
                <ListGroup variant="flush" className="small">
                  {pool.map((p, i) => (
                    <ListGroup.Item key={i} className="py-1 px-2">{p}</ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="transparent-card compact-card p-2">
              <Card.Body>
                <Card.Title className="fs-6">House Rules</Card.Title>
                <ListGroup variant="flush" className="small">
                  {rules.map((r, i) => (
                    <ListGroup.Item key={i} className="py-1 px-2">{r}</ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col>
          <footer className="bg-light text-center py-3 mt-5 border-top">
      <Container>
        <h6 className="mb-1 small fw-bold">For Inquiries & Reservations</h6>
        <p className="mb-1 small">Email: azurebriahnastaycation@gmail.com</p>
        <p className="small">
          Viber/Call/Text: 0956 761 4728 • 0916 286 0796
        </p>
      </Container>
    </footer>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Pricing;
