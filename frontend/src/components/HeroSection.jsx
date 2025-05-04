import React from 'react';

import trialimg from '../assets/trial3.jpg'; 

const HeroSection = () => {
  return (
    <div
      className="hero-section d-flex flex-column align-items-center justify-content-center text-white"
      style={{
        height: '300px',
        backgroundImage: `url(${trialimg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <h1>Welcome to AzureHub</h1> <br/>
      <p>AzureHub – Where Relaxation Meets Elegance</p>
    </div>
  );
};

export default HeroSection;
