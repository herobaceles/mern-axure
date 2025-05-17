import React from 'react';
import trialimg from '../assets/trial10.jpg';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button } from 'react-bootstrap';
import { useAuthStore } from '@/store/authStore';
import { Link, useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="container-fluid p-0 m-0">
      <div
        className="hero-section position-relative text-white"
        style={{
          height: '100vh',
          width: '100%',
          backgroundImage: `url(${trialimg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'brightness(1.2)',
          overflow: 'hidden',
        }}
      >
        {/* Overlay */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            background: 'linear-gradient(to right, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.1))',
            zIndex: 1,
          }}
        ></div>

        {/* Navbar */}
        <Navbar
          expand="lg"
          className="bg-transparent px-4 py-3 position-absolute top-0 start-0 w-100"
          style={{ zIndex: 2 }}
        >
          <Container fluid>
            <Navbar.Toggle aria-controls="navbar-center" />
            <Navbar.Collapse id="navbar-center">
              <div className="row w-100 align-items-center text-center">
                {/* Left: Brand */}
                <div className="col-4 text-start">
                  <Navbar.Brand as={Link} to="/" className="text-white fw-bold">
                    AzureHub
                  </Navbar.Brand>
                </div>

                {/* Center: Nav Links */}
                <div className="col-4 d-flex justify-content-center">
                  <Nav>
                    <Nav.Link href="#home" className="mx-2 text-white">Home</Nav.Link>
                    <Nav.Link href="#rooms" className="mx-2 text-white">Rooms</Nav.Link>
                    <Nav.Link href="#pricing" className="mx-2 text-white">Pricing</Nav.Link>
                    <Nav.Link href="#about" className="mx-2 text-white">About</Nav.Link>
                  </Nav>
                </div>

                {/* Right: Auth Buttons */}
                <div className="col-4 d-flex justify-content-end align-items-center">
                  {isAuthenticated ? (
                    <>
                      <span className="me-2 fw-semibold text-white text-nowrap">
                        Welcome, {user?.name || user?.email}
                      </span>
                      <Button variant="outline-light" size="sm" onClick={handleLogout}>
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <Nav.Link as={Link} to="/login" className="mx-2 text-white">Sign in</Nav.Link>
                      <Nav.Link as={Link} to="/signup" className="mx-2 text-white">Sign up</Nav.Link>
                    </>
                  )}
                </div>
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        {/* Hero Text Content */}
        <div
          className="position-relative d-flex flex-column justify-content-center align-items-start h-100 px-5"
          style={{ zIndex: 2, maxWidth: '600px' }}
        >
          <h1 className="display-4 fw-bold mb-3" style={{ textShadow: '2px 2px 6px rgba(0,0,0,0.6)' }}>
            Welcome to AzureHub
          </h1>
          <p className="lead" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.6)' }}>
            Treat yourself to the perfect staycation at AzureHub — a relaxing escape close to home,
            with all the comfort and charm you need to unwind.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
