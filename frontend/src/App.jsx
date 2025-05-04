import { useState } from 'react';
import VerificationEmailPage from './pages/VerificationEmailPage';
import Button from 'react-bootstrap/Button';
import { Route, Routes } from 'react-router-dom';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap CSS globally
import Home from './pages/Home';
import './index.css';  // Make sure the path to index.css is correct

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verify-email" element={<VerificationEmailPage />} />
      </Routes>
    </>
  );
}

export default App;
