import { Routes, Route, Navigate } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import { ToastContainer } from "react-toastify";
import { VerificationEmailPage } from "./pages/VerificationEmailPage";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import DashboardPage from "./pages/DashboardPage";
import Home from "./pages/Home";
import './index.css'


const ProtectRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (!isAuthenticated && !user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const AuthenticatedUserRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  
  if (isAuthenticated && user) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};


function App() {
  const { isCheckingAuth, checkAuth, logout, user } = useAuthStore();

  // useEffect(() => {
  //   checkAuth();
  // }, [checkAuth]);
  useEffect(() => {
    const init = async () => await checkAuth();
    init();
  }, []);
  // console.log(user)

  if (isCheckingAuth) {
    return <div>Loading...</div>;
  }

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="container-fluid p-0 m-0">
       
      <Routes>
        <Route path="/" element={ <Home />} />
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
       
      
        <Route
          path="/dashboard"
          element={
            <ProtectRoute>
              <DashboardPage />
            </ProtectRoute>
          }
        />
      </Routes>

      {/* React Toastify Container */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}

export default App;
