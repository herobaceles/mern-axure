import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

function LoginPromptFooter() {
  const { isAuthenticated } = useAuthStore();
  const greenColor = "#28a745";

  if (isAuthenticated) return null;

  return (
    <footer className="bg-white shadow-sm py-5 mt-5 border-top">
      <Container className="text-center">
        <h4 className="fw-bold text-dark mb-3">🔒 Log In First to Book</h4>
        <p className="text-muted mb-4">
          To view availability and make reservations, please log in to your account.
        </p>
        <Link
          to="/login"
          className="btn px-4 py-2 rounded-pill text-white fw-medium"
          style={{
            backgroundColor: greenColor,
            fontSize: "1rem",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          Log In Now
        </Link>
      </Container>
    </footer>
  );
}

export default LoginPromptFooter;
