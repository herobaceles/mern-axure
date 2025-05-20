import React from 'react';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
import { CheckCircleFill } from 'react-bootstrap-icons';

function Pricing() {
  const generalAmenities = [
    'Man-made Beach',
    'Wave Pool',
    'Kiddie Beach Playground',
    'Sky Garden (7 AM–10 PM only, no food allowed)',
    '24/7 Security Assistance',
  ];

  const diningServices = [
    'Sand Bar (open until 11 PM)',
    'Paris Beach Club (Dining Area, Lockers & Showers)',
    'Convenience stores (7-Eleven, Food Stalls)',
    'Paid Laundry Services',
    'Pay Parking',
  ];

  const poolAccess = [
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

  const groups = [
    { title: 'General Amenities', items: generalAmenities },
    { title: 'Dining & Services', items: diningServices },
    { title: 'Pool Access', items: poolAccess },
    { title: 'House Rules', items: rules },
  ];

  return (
    <div
      style={{
        backgroundImage: "url('/src/assets/trial9.jpg')", // Update path as needed
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        padding: '3rem 1rem',
        minHeight: '100vh',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div style={{ borderRadius: '20px', padding: '2rem' }}>
        <Container className="text-dark">
          <h3
            className="text-center fs-4 mb-5 fw-bold"
            style={{
              color: '#FFFFFF',
              borderBottom: '3px solid #007a6d',
              paddingBottom: '0.5rem',
              maxWidth: '320px',
              margin: '0 auto 3rem auto',
            }}
          >
            Staycation Amenities & Rules
          </h3>

          <Row className="g-4">
            {groups.map(({ title, items }, idx) => (
              <Col md={6} lg={3} key={idx}>
                <Card
                  className="shadow-sm rounded-4 h-100"
                  style={{
                    backgroundColor: 'white',
                    border: 'none',
                    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                    cursor: 'default',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow =
                      '0 12px 24px rgba(0, 122, 109, 0.25)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
                  }}
                >
                  <Card.Body>
                    <Card.Title
                      className="fs-5 mb-4"
                      style={{
                        color: '#007a6d',
                        fontWeight: '700',
                        fontFamily: "'Georgia', serif",
                        borderBottom: '2px solid #007a6d',
                        paddingBottom: '0.5rem',
                      }}
                    >
                      {title}
                    </Card.Title>
                    <ListGroup variant="flush" className="small" style={{ lineHeight: '1.8' }}>
                      {items.map((item, i) => (
                        <ListGroup.Item
                          key={i}
                          className="py-2 px-3 d-flex align-items-center"
                          style={{
                            border: 'none',
                            color: '#4b615e',
                            gap: '0.5rem',
                          }}
                        >
                          <CheckCircleFill
                            color="#007a6d"
                            size={16}
                            style={{ flexShrink: 0 }}
                          />
                          {item}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Pricing;
