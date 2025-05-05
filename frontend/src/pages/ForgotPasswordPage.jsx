import { useState } from "react";
import { useAuthStore } from "@/store/authStore";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const { forgotPassword, message } = useAuthStore();

  async function onSubmit(e) {
    e.preventDefault();
    await forgotPassword(email);
  }

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card" style={{ maxWidth: "500px", width: "100%" }}>
        <div className="card-header text-center">
          <h5 className="card-title mb-0">Forgot Password</h5>
          <p className="text-muted mb-0">Enter your email to reset your password.</p>
        </div>
        <div className="card-body">
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Reset Password
            </button>
          </form>
        </div>
        <div className="card-footer text-center">
          {message && <p className="text-success small mb-2">{message}</p>}
          <button type="button" className="btn btn-link p-0">
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}
