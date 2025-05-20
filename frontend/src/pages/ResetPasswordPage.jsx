import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Container, Card, Form, Button } from 'react-bootstrap';

const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { state } = useLocation();
  const navigate = useNavigate();
  const email = state?.email;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:3000/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, newPassword }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      toast.success(data.message);
      navigate('/login');
    } catch (err) {
      toast.error(err.message);
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
            <h5 className="text-danger mb-3">Invalid Reset Attempt</h5>
            <p>Please go back and start the process again.</p>
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
              Reset Password
            </h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold text-dark">New Password</Form.Label>
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Enter your new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="rounded-3"
                />
                <Form.Check
                  type="checkbox"
                  label="Show Password"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                  className="mt-2 small text-muted"
                />
              </Form.Group>
              <Button
                type="submit"
                className="w-100 rounded-3 fw-semibold"
                style={{ backgroundColor: '#007a6d', border: 'none' }}
              >
                Reset Password
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default ResetPasswordPage;
