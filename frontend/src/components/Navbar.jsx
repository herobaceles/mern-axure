import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button } from 'react-bootstrap';
import { useAuthStore } from '@/store/authStore';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function NavBar() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  const [hoveredLink, setHoveredLink] = useState(null);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const navItems = ['Home', 'Rooms', 'Pricing', 'About'];

  return (
   <Navbar
  expand="lg"
  fixed="top"
  className=" px-4 py-3"
  style={{ backgroundColor: 'transparent' }}
  variant="dark"
>
      <Container fluid>
        {/* Brand */}
        <Navbar.Brand
          as={NavLink}
          to="/"
          className="fw-bold text-uppercase"
          style={{ letterSpacing: '1.2px', userSelect: 'none', cursor: 'pointer' }}
        >
          AzureHub
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" className="border-white" />
        <Navbar.Collapse id="navbar-nav">
          {/* Center nav links */}
          <Nav className="mx-auto">
            {navItems.map((item) => {
              const lower = item.toLowerCase();
              return (
                <Nav.Link
                  key={item}
                  as={NavLink}
                  to={`#${lower}`}
                  end
                  className={({ isActive }) =>
                    `mx-3 fw-medium ${
                      isActive ? 'text-teal' : 'text-white'
                    }`
                  }
                  style={{
                    letterSpacing: '0.05em',
                    transition: 'color 0.3s ease',
                    color:
                      hoveredLink === item ? '#00bfa5' : undefined,
                  }}
                  onMouseEnter={() => setHoveredLink(item)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  {item}
                </Nav.Link>
              );
            })}
          </Nav>

          {/* Right auth buttons */}
          <Nav className="ms-auto align-items-center">
            {isAuthenticated ? (
              <>
                <span
                  className="me-3 fw-semibold text-white text-nowrap"
                  style={{ userSelect: 'none' }}
                >
                  Welcome, {user?.name || user?.email}
                </span>
                <Button
                  variant="outline-light"
                  size="sm"
                  onClick={handleLogout}
                  className="fw-semibold"
                  style={{
                    letterSpacing: '0.03em',
                    transition: 'background-color 0.3s ease',
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = '#00bfa5')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = 'transparent')
                  }
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link
                  as={NavLink}
                  to="/login"
                  className={({ isActive }) =>
                    `mx-2 fw-medium ${
                      isActive ? 'text-teal text-decoration-underline' : 'text-white'
                    }`
                  }
                >
                  Sign in
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to="/signup"
                  className={({ isActive }) =>
                    `mx-2 fw-medium ${
                      isActive ? 'text-teal text-decoration-underline' : 'text-white'
                    }`
                  }
                >
                  Sign up
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
