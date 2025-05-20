import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button, Modal } from 'react-bootstrap';
import { useAuthStore } from '@/store/authStore';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';

function NavBar() {
  const { user, isAuthenticated, logout, checkAuth, isCheckingAuth } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // NEW STATES for bookings
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(false);
  const [bookingsError, setBookingsError] = useState(null);

  const isHomeRoute = location.pathname === '/' || location.pathname === '/dashboard';
  const navItems = [
    { label: 'Home', to: isAuthenticated ? '/dashboard' : '/', scrollToId: null },
    { label: 'Rooms', to: isAuthenticated ? '/dashboard' : '/', scrollToId: 'rooms' },
    { label: 'Pricing', to: isAuthenticated ? '/dashboard' : '/', scrollToId: 'pricing' },
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

  // NEW useEffect to fetch bookings when profile modal opens
  useEffect(() => {
    if (showProfileModal) {
      setLoadingBookings(true);
      setBookingsError(null);

      fetch('/api/bookings', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // adjust if token stored elsewhere
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error('Failed to fetch bookings');
          return res.json();
        })
        .then((data) => {
          setBookings(data || []);
        })
        .catch((err) => setBookingsError(err.message))
        .finally(() => setLoadingBookings(false));
    }
  }, [showProfileModal]);

  const isScrolledOrNotHome = scrolled || !isHomeRoute;

  // Fixed position: top on mobile, else bottom if scrolled/not home, else top
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
                  <FaUserCircle
                    size={26}
                    className="me-3"
                    style={{ cursor: 'pointer', color: isScrolledOrNotHome ? '#007f5f' : 'white' }}
                    onClick={() => setShowProfileModal(true)}
                  />
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

      {/* Profile Modal */}
      <Modal show={showProfileModal} onHide={() => setShowProfileModal(false)} centered dialogClassName="rounded-modal" size="lg">
        <Modal.Header
          closeButton
          style={{
            backgroundColor: '#007f5f',
            color: 'white',
            borderTopLeftRadius: '0.5rem',
            borderTopRightRadius: '0.5rem',
            borderBottom: '1px solid #e0e0e0',
          }}
        >
          <Modal.Title className="fw-bold">Your Profile & Booking History</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontSize: '1rem', padding: '1.5rem' }}>
          <p><strong>Name:</strong> {user?.name}</p>
          <p><strong>Email:</strong> {user?.email}</p>

          <hr />

          {/*
          <h5>Booking History</h5>

          {loadingBookings && <p>Loading bookings...</p>}
          {bookingsError && <p className="text-danger">{bookingsError}</p>}

          {!loadingBookings && !bookingsError && bookings.length === 0 && <p>No bookings found.</p>}

          {!loadingBookings && bookings.length > 0 && (
            <ul>
              {bookings.map((booking) => (
                <li key={booking._id}>
                  <strong>{booking.roomType}</strong> - Check-in: {new Date(booking.checkIn).toLocaleDateString()} - Nights: {booking.nights}
                </li>
              ))}
            </ul>
          )}
          */}

          <div className="d-grid gap-2 mt-4">
            {/*
            <Button
              variant="outline-success"
              onClick={() => {
                setShowProfileModal(false);
                navigate('/change-password');
              }}
            >
              Change Password
            </Button>
            */}
            <Button
              variant="danger"
              onClick={() => {
                setShowProfileModal(false);
                setShowLogoutModal(true);
              }}
            >
              Logout
            </Button>
          </div>
        </Modal.Body>
        <Modal.Footer style={{ borderTop: '1px solid #e0e0e0', justifyContent: 'center' }}>
          <Button variant="secondary" onClick={() => setShowProfileModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NavBar;
