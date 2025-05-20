

import React from 'react';
import trialimg from '../assets/trial10.jpg';
import NavBar from './Navbar'; // import NavBar component

const HeroSection = () => {
  return (
    <div  className="container-fluid p-0 m-0">
      <div
      id="hero-section" 
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

        {/* NavBar Component */}
        

        {/* Hero Text Content */}
        <div
          className="position-relative d-flex flex-column justify-content-center align-items-start h-100 px-5"
          style={{ zIndex: 2, maxWidth: '600px' }}
        >
          <h1
            className="display-4 fw-bold mb-3"
            style={{ textShadow: '2px 2px 6px rgba(0,0,0,0.6)' }}
          >
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
