import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const About = () => {
  return (
    <div style={{ backgroundColor: '#fef9f3', padding: '3rem 1rem' }}>
      <Container>
        <div className="text-center mb-4">
          <h3
            className="fw-bold"
            style={{
              color: '#007a6d',
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
              fontSize: '1.8rem',
            }}
          >
            ABOUT US
          </h3>
          <p
            className="mb-3"
            style={{ color: '#4b615e', fontStyle: 'italic', fontSize: '1rem' }}
          >
            Discover comfort, style, and convenience at Azure Urban Staycation.
          </p>
          <div
            className="mx-auto rounded-pill"
            style={{ height: '4px', width: '50px', backgroundColor: '#007a6d' }}
          />
        </div>

        <Row className="align-items-center g-4">
          <Col md={6}>
            <Card className="border-0 shadow-sm rounded-4 h-100">
              <Card.Body className="p-4">
                <h5
                  className="text-success fw-semibold mb-3"
                  style={{ fontFamily: "'Georgia', serif", fontSize: '1.1rem' }}
                >
                  AzureHub Urban Staycation
                </h5>
                <p style={{ fontSize: '0.95rem', color: '#333' }}>
                  Welcome to AzureHub Urban Staycation – your home away from home.
                  Located in the heart of the city, our hotel offers the perfect blend
                  of comfort, style, and convenience. Whether you're here for business
                  or a relaxing getaway, we’ve got everything you need.
                </p>
                <p style={{ fontSize: '0.95rem', color: '#333' }}>
                   Enjoy top-tier amenities, a serene poolside experience, high-speed internet, and convenient access to local attractions and entertainment hubs. Come stay with us and experience hospitality redefined
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card className="shadow-sm border-0 rounded-4 overflow-hidden">
              <iframe
                title="Hotel Location"
                width="100%"
                height="350"
                frameBorder="0"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3863.0135608073983!2d121.04132330921574!3d14.483910785930258!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397cf0585c07d9b%3A0xef3e63b30f501b33!2sAzure%20Beach%20Resort!5e0!3m2!1sen!2sph!4v1747674947946!5m2!1sen!2sph"
              ></iframe>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default About;
