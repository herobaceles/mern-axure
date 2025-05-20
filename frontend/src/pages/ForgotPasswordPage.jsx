import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Container, Card, Form, Button } from 'react-bootstrap';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:3000/api/auth/send-reset-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      toast.success(data.message);
      navigate('/verify-reset-code', { state: { email } });
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        backgroundColor: '#f7fdfc',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <Container style={{ maxWidth: '420px' }}>
        <Card
          className="shadow-lg rounded-4"
          style={{
            backgroundColor: '#fff',
            border: 'none',
          }}
        >
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
              Forgot Password
            </h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold text-dark">Email address</Form.Label>
                <Form.Control
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-3"
                />
              </Form.Group>
              <Button
                variant="success"
                type="submit"
                className="w-100 rounded-3 fw-semibold"
                style={{ backgroundColor: '#007a6d', border: 'none' }}
              >
                Send Reset Code
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default ForgotPasswordPage;
