import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button, Modal } from 'react-bootstrap';
import { useAuthStore } from '@/store/authStore';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

function NavBar() {
  const { user, isAuthenticated, logout, checkAuth, isCheckingAuth } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const isHomeRoute = location.pathname === '/' || location.pathname === '/dashboard';

  const navItems = [
    { label: 'Home', to: isAuthenticated ? '/dashboard' : '/', scrollToId: null },
    { label: 'Rooms', to: isAuthenticated ? '/dashboard' : '/', scrollToId: 'rooms' },
    { label: 'My Bookings', to: isAuthenticated ? '/dashboard' : '/', scrollToId: 'bookings' },
    { label: 'Amenities', to: isAuthenticated ? '/dashboard' : '/', scrollToId: 'pricing' },
    { label: 'About', to: isAuthenticated ? '/dashboard' : '/', scrollToId: 'about' },
  ];

  const confirmLogout = async () => {
    await logout();
    setShowLogoutModal(false);
    navigate('/');
  };

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 992);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    if (isHomeRoute) {
      handleScroll();
      window.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (isHomeRoute) window.removeEventListener('scroll', handleScroll);
    };
  }, [isHomeRoute]);

  const isScrolledOrNotHome = scrolled || !isHomeRoute;
  const fixedPosition = isMobile ? 'top' : isScrolledOrNotHome ? 'bottom' : 'top';

  return (
    <>
      <Navbar
        expand="lg"
        fixed={fixedPosition}
        className="px-4 py-3"
        style={{
          backdropFilter: isScrolledOrNotHome ? 'blur(12px)' : 'none',
          backgroundColor: isScrolledOrNotHome
            ? 'rgba(255, 255, 255, 0.95)'
            : 'transparent',
          transition: 'all 0.6s ease-in-out',
          boxShadow: isScrolledOrNotHome ? '0 2px 12px rgba(0,0,0,0.05)' : 'none',
          zIndex: 1050,
        }}
      >
        <Container fluid>
          <Navbar.Brand
            as={NavLink}
            to={isAuthenticated ? '/dashboard' : '/'}
            className="fw-bold text-uppercase"
            style={{
              letterSpacing: '1.2px',
              userSelect: 'none',
              color: isScrolledOrNotHome ? '#007f5f' : 'white',
            }}
          >
            AzureHub
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbar-nav" className={isScrolledOrNotHome ? '' : 'border-white'} />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="mx-auto">
              {navItems.map((item) => (
                <Nav.Link
                  key={item.label}
                  as="a"
                  href={item.scrollToId ? `#${item.scrollToId}` : item.to}
                  onClick={(e) => {
                    if (item.label === 'Home' && location.pathname === item.to) {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    } else if (item.scrollToId && location.pathname === '/dashboard') {
                      e.preventDefault();
                      const el = document.getElementById(item.scrollToId);
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    } else if (item.scrollToId && location.pathname !== '/dashboard') {
                      e.preventDefault();
                      navigate('/dashboard');
                      // Delay scrolling to ensure DOM is loaded after navigation
                      setTimeout(() => {
                        const el = document.getElementById(item.scrollToId);
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }, 200);
                    } else if (item.to && location.pathname !== item.to) {
                      e.preventDefault();
                      navigate(item.to);
                    }
                  }}
                  className="fw-medium mx-3"
                  style={{
                    letterSpacing: '0.05em',
                    color:
                      hoveredLink === item.label
                        ? '#007f5f'
                        : isScrolledOrNotHome
                        ? '#333'
                        : 'white',
                    transition: 'color 0.3s ease',
                  }}
                  onMouseEnter={() => setHoveredLink(item.label)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  {item.label}
                </Nav.Link>
              ))}
            </Nav>

            <Nav className="ms-auto align-items-center">
              {isCheckingAuth ? (
                <span className="me-3 text-muted" style={{ fontStyle: 'italic', fontSize: '0.9rem' }}>
                  Checking...
                </span>
              ) : isAuthenticated ? (
                <>
                  <div
                    className="d-flex flex-column align-items-end me-3"
                    style={{ color: isScrolledOrNotHome ? '#007f5f' : 'white', cursor: 'pointer' }}
                    onClick={() => setShowLogoutModal(true)}
                    title="Click to logout"
                  >
                    <div className="fw-semibold">{user?.name || 'User'}</div>
                    <small style={{ fontSize: '0.8rem' }}>{user?.email || 'No email'}</small>
                  </div>
                </>
              ) : (
                <>
                  <Nav.Link
                    as={NavLink}
                    to="/login"
                    className="mx-2 fw-medium"
                    style={{ color: isScrolledOrNotHome ? '#007f5f' : 'white' }}
                  >
                    Sign in
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    to="/signup"
                    className="mx-2 fw-medium"
                    style={{ color: isScrolledOrNotHome ? '#007f5f' : 'white' }}
                  >
                    Sign up
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Logout Modal */}
      <Modal show={showLogoutModal} onHide={() => setShowLogoutModal(false)} centered dialogClassName="rounded-modal">
        <Modal.Header
          closeButton
          style={{
            backgroundColor: '#81C784',
            color: 'white',
            borderTopLeftRadius: '0.5rem',
            borderTopRightRadius: '0.5rem',
            borderBottom: '1px solid #e0e0e0',
          }}
        >
          <Modal.Title className="fw-bold">Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center" style={{ fontSize: '1rem', padding: '1.5rem' }}>
          Are you sure you want to log out?
        </Modal.Body>
        <Modal.Footer style={{ borderTop: '1px solid #e0e0e0', justifyContent: 'center' }}>
          <Button variant="secondary" onClick={() => setShowLogoutModal(false)} style={{ minWidth: '100px' }}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmLogout} style={{ minWidth: '100px' }}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NavBar;
