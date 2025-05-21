import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: '#222',
        color: '#eee',
        padding: '20px 0',  // reduced padding from 40px to 20px
        marginTop: 'auto',
        fontSize: '0.9rem', // slightly smaller font for compactness
      }}
    >
      <Container>
        <Row>
          {/* About Section */}
          <Col md={4} className="mb-3">
            <h5 style={{ marginBottom: '0.5rem' }}>About AzureHub</h5>
            <p style={{ marginBottom: 0 }}>
              AzureHub is your perfect staycation destination — comfort, charm, and convenience
              all in one place. Relax, recharge, and enjoy your getaway close to home.
            </p>
          </Col>

          {/* Quick Links */}
          <Col md={4} className="mb-3">
            <h5 style={{ marginBottom: '0.5rem' }}>Quick Links</h5>
            <ul className="list-unstyled" style={{ marginBottom: 0 }}>
              <li><a href="#home" style={{ color: '#eee', textDecoration: 'none' }}>Home</a></li>
              <li><a href="#rooms" style={{ color: '#eee', textDecoration: 'none' }}>Rooms</a></li>
              <li><a href="#pricing" style={{ color: '#eee', textDecoration: 'none' }}>Pricing</a></li>
              <li><a href="#about" style={{ color: '#eee', textDecoration: 'none' }}>About</a></li>
              <li><a href="/login" style={{ color: '#eee', textDecoration: 'none' }}>Sign In</a></li>
            </ul>
          </Col>

          {/* Contact Info */}
          <Col md={4}>
            <h5 style={{ marginBottom: '0.5rem' }}>Contact Us</h5>
            <address style={{ marginBottom: 0, fontStyle: 'normal' }}>
              Paranuaque<br />
              Manila<br />
              Email: <a href="mailto:info@azurehub.com" style={{ color: '#eee' }}>ahubscaps1111@gmail.com</a><br />
              Phone: <a href="tel:+1234567890" style={{ color: '#eee' }}>+63 (234) 111-222</a>
            </address>
          </Col>
        </Row>

        <hr style={{ borderColor: '#444', margin: '1rem 0' }} />

        <Row className="text-center">
          <Col>
            <small>&copy; {new Date().getFullYear()} AzureHub. All rights reserved.</small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
