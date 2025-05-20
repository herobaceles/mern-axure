import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap';

const VerifyResetCodePage = () => {
  const [code, setCode] = useState('');
  const [resending, setResending] = useState(false);
  const { state } = useLocation();
  const navigate = useNavigate();
  const email = state?.email;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:3000/api/auth/verify-reset-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      toast.success(data.message);
      navigate('/reset-password', { state: { email } });
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleResend = async () => {
    try {
      setResending(true);
      const res = await fetch('http://localhost:3000/api/auth/send-reset-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      toast.success('Reset code resent to your email.');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setResending(false);
    }
  };

  if (!email) {
    return (
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: '100vh', backgroundColor: '#f7fdfc' }}
      >
        <Card className="p-4 text-center shadow rounded-4">
          <Card.Body>
            <h5 className="text-danger mb-3">Email not provided</h5>
            <p>Please go back and enter your email address.</p>
            <Button variant="secondary" onClick={() => navigate('/forgot-password')}>
              Back to Forgot Password
            </Button>
          </Card.Body>
        </Card>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f7fdfc',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <Container style={{ maxWidth: '420px' }}>
        <Card className="shadow-lg rounded-4 border-0">
          <Card.Body>
            <h3
              className="text-center mb-4"
              style={{
                color: '#007a6d',
                fontWeight: 'bold',
                borderBottom: '2px solid #007a6d',
                paddingBottom: '0.5rem',
                fontFamily: "'Georgia', serif",
              }}
            >
              Verify Reset Code
            </h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold text-dark">6-digit Code</Form.Label>
                <Form.Control
                  type="text"
                  required
                  placeholder="Enter the 6-digit code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="rounded-3"
                />
              </Form.Group>

              <Row className="align-items-center">
                <Col>
                  <Button
                    type="submit"
                    className="w-100 rounded-3 fw-semibold"
                    style={{ backgroundColor: '#007a6d', border: 'none' }}
                  >
                    Verify Code
                  </Button>
                </Col>
              </Row>

              <div className="text-center mt-3">
                <Button
                  variant="link"
                  disabled={resending}
                  onClick={handleResend}
                  style={{ color: '#007a6d', fontWeight: '500', textDecoration: 'none' }}
                >
                  {resending ? 'Resending...' : 'Resend Code'}
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default VerifyResetCodePage;
