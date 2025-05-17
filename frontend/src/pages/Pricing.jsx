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
    <div style={{ backgroundColor: '#fef9f3', padding: '3rem 1rem', minHeight: '100vh' }}>
      <Container className="text-dark">
        <h3
          className="text-center fs-5 mb-4 fw-bold"
          style={{ color: '#007a6d', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}
        >
          Staycation Amenities & Rules
        </h3>

        <Row className="g-4 mb-5">
          {[{ title: 'Amenities for All Units', items: amenities },
            { title: 'Pool Access', items: pool },
            { title: 'House Rules', items: rules }
          ].map(({ title, items }, idx) => (
            <Col md={4} key={idx}>
              <Card
                className="shadow-sm rounded-4 h-100"
                style={{ backgroundColor: 'white', border: 'none' }}
              >
                <Card.Body>
                  <Card.Title
                    className="fs-6 mb-3"
                    style={{ color: '#007a6d', fontWeight: '600', fontFamily: "'Georgia', serif" }}
                  >
                    {title}
                  </Card.Title>
                  <ListGroup variant="flush" className="small" style={{ lineHeight: '1.6' }}>
                    {items.map((item, i) => (
                      <ListGroup.Item
                        key={i}
                        className="py-2 px-3"
                        style={{ border: 'none', color: '#4b615e' }}
                      >
                        {item}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <footer
          className="text-center py-4 mt-5 rounded-3 shadow-sm"
          style={{ backgroundColor: 'white', color: '#4b615e', fontSize: '0.9rem' }}
        >
          <Container>
            <h6 className="mb-1 fw-bold" style={{ color: '#007a6d' }}>
              For Inquiries & Reservations
            </h6>
            <p className="mb-1">Email: azurebriahnastaycation@gmail.com</p>
            <p>Viber/Call/Text: 0956 761 4728 • 0916 286 0796</p>
          </Container>
        </footer>
      </Container>
    </div>
  );
}

export default Pricing;
