import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";

import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import Home from "./pages/Home";
import VerifyResetCodePage from "./pages/VerifyResetCodePage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import AdminDashboard from "./pages/AdminDashboard";
import VerificationEmailPage from "./pages/VerificationEmailPage"; // ✅

import { useAuthStore } from "./store/authStore";

import "./index.css";

// 🔐 Protect routes for authenticated users
const ProtectRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (!isAuthenticated || !user) {
    return <Navigate to="/" replace />;
  }

  // Prevent admin from accessing user dashboard
  if (user.role === "admin") {
    return <Navigate to="/admin" replace />;
  }

  return children;
};

// 🚫 Block authenticated users from accessing login/signup
const AuthenticatedUserRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (isAuthenticated && user) {
    return user.role === "admin" ? (
      <Navigate to="/admin" replace />
    ) : (
      <Navigate to="/dashboard" replace />
    );
  }
  return children;
};

// 🔐 Protect admin-only routes
const AdminRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (!isAuthenticated || !user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }
  return children;
};

// 🛡️ Block admin from accessing public routes like Home
const ClientOnlyRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (isAuthenticated && user?.role === "admin") {
    return <Navigate to="/admin" replace />;
  }
  return children;
};

function App() {
  const { isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    const init = async () => await checkAuth();
    init();
  }, []);

  if (isCheckingAuth) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container-fluid p-0 m-0">
      <Routes>
        {/* Public Home */}
        <Route
          path="/"
          element={
            <ClientOnlyRoute>
              <Home />
            </ClientOnlyRoute>
          }
        />

        {/* Auth */}
        <Route
          path="/signup"
          element={
            <AuthenticatedUserRoute>
              <SignUpPage />
            </AuthenticatedUserRoute>
          }
        />
        <Route
          path="/login"
          element={
            <AuthenticatedUserRoute>
              <LoginPage />
            </AuthenticatedUserRoute>
          }
        />
        <Route path="/verify-email" element={<VerificationEmailPage />} />

        {/* Authenticated User Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectRoute>
              <DashboardPage />
            </ProtectRoute>
          }
        />

        {/* Admin Dashboard */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        {/* Password Reset Flow */}
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/verify-reset-code" element={<VerifyResetCodePage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}

export default App;
