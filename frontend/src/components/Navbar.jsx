import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button } from 'react-bootstrap';
import { useAuthStore } from '@/store/authStore'; // Custom auth store
import { Link, useNavigate } from 'react-router-dom';

function NavBar() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/'); // Redirect to home after logout
  };

  return (
    <Container className=' mb-4'>
      <Navbar expand="lg" className="bg-transparent rounded-2 px-3 py-1">
        <Container fluid>
          {/* Brand */}
          <Navbar.Brand as={Link} to="/">AzureHub</Navbar.Brand>

          <Navbar.Toggle aria-controls="navbar-center" />
          <Navbar.Collapse id="navbar-center" className="justify-content-between">
            {/* Center Nav Links */}
            <Nav className="mx-auto">
              <Nav.Link href="#home" className="mx-3">Home</Nav.Link>
              <Nav.Link href="#rooms" className="mx-3">Rooms</Nav.Link>
              <Nav.Link href="#pricing" className="mx-3">Pricing</Nav.Link>
              <Nav.Link href="#about" className="mx-3">About</Nav.Link>
            </Nav>

            {/* Right Section: Auth Buttons or User Info */}
            <div className="d-flex align-items-center">
              {isAuthenticated ? (
                <>
                  <span className="me-3 fw-semibold">Welcome, {user?.name || user?.email}</span>
                  <Button variant="outline-danger" size="sm" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/login" className="mx-2">Sign in</Nav.Link>
                  <Nav.Link as={Link} to="/signup" className="mx-2">Sign up</Nav.Link>
                </>
              )}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Container>
  );
}

export default NavBar;
