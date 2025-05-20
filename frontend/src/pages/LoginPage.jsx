import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock } from 'lucide-react';
import { useAuthStore } from "@/store/authStore";
import { useNavigate, Link } from 'react-router-dom';
import trialImg from '../assets/trial3.jpg';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      const user = useAuthStore.getState().user;
      console.log("Logged in user:", user);

      if (user?.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Login error:", err.message);
    }
  };

  // Replace with your actual green hex code if different
  const greenColor = '#28a745';

  return (
    <div className="d-flex align-items-center justify-content-center bg-light" style={{ height: '100vh' }}>
      <div className="row shadow bg-white rounded-4 overflow-hidden w-100 mx-3 mx-md-0" style={{ maxWidth: '1000px', height: '75vh' }}>

        {/* Left Image Panel */}
        <div className="col-md-6 d-none d-md-block p-0">
          <img
            src={trialImg}
            alt="Login Illustration"
            className="img-fluid w-100 h-100"
            style={{ objectFit: 'cover' }}
          />
        </div>

        {/* Right Form Panel */}
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <div className="p-4 p-md-5 w-100" style={{ maxWidth: '400px' }}>
            <h2 className="fw-bold text-dark text-center mb-3">Welcome Back</h2>
            <p className="text-muted text-center mb-4">Sign in to your account</p>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <div className="input-group">
                  <span className="input-group-text bg-white">
                    <Mail size={18} className="text-muted" />
                  </span>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="mb-2">
                <label htmlFor="password" className="form-label">Password</label>
                <div className="input-group">
                  <span className="input-group-text bg-white">
                    <Lock size={18} className="text-muted" />
                  </span>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="d-flex justify-content-end mb-4">
                <Link
                  to="/forgot-password"
                  className="text-decoration-none small"
                  style={{ color: greenColor }}
                >
                  Forgot Password?
                </Link>
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <button
                  type="submit"
                  className="btn w-100 py-2 rounded-3 text-white"
                  style={{ backgroundColor: greenColor }}
                  disabled={isLoading}
                >
                  {isLoading ? 'Logging in...' : 'Login'}
                </button>
              </motion.div>

              {error && (
                <div className="alert alert-danger mt-3" role="alert">
                  {error}
                </div>
              )}

              <p className="mt-4 text-center">
                <Link
                  to="/"
                  className="text-decoration-none small"
                  style={{ color: greenColor }}
                >
                  ← Back to Home
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
