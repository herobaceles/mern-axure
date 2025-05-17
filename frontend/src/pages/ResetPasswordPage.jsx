import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState('');
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

  if (!email) return <div>Invalid reset attempt. Please try again.</div>;

  return (
    <div className="container mt-5">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          required
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="form-control my-2"
        />
        <button type="submit" className="btn btn-success">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
