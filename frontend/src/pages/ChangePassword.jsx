import { useState } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call your backend API here
      const res = await fetch('/api/users/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccessMessage(data.message || 'Password updated!');
        setError('');
      } else {
        setError(data.message || 'Something went wrong.');
        setSuccessMessage('');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to change password.');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '90vh' }}>
      <Card style={{ maxWidth: '400px', width: '100%' }} className="p-4 shadow-sm border-0">
        <h4 className="text-center mb-3 text-success">Change Password</h4>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="currentPassword" className="mb-3">
            <Form.Label>Current Password</Form.Label>
            <Form.Control
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="newPassword" className="mb-4">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Form.Group>
          {error && <div className="text-danger mb-3">{error}</div>}
          {successMessage && <div className="text-success mb-3">{successMessage}</div>}
          <div className="d-grid">
            <Button type="submit" variant="success">Update Password</Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
}

export default ChangePassword;
