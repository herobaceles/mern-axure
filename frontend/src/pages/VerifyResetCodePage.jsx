import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const VerifyResetCodePage = () => {
  const [code, setCode] = useState('');
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

  if (!email) return <div>Email not provided. Go back and enter your email.</div>;

  return (
    <div className="container mt-5">
      <h2>Verify Reset Code</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          required
          placeholder="Enter the 6-digit code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="form-control my-2"
        />
        <button type="submit" className="btn btn-success">Verify Code</button>
      </form>
    </div>
  );
};

export default VerifyResetCodePage;
