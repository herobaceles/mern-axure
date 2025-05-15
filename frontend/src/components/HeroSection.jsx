import React from 'react';
import trialimg from '../assets/trial3.jpg';

const HeroSection = () => {
  return (
    <div className="container-fluid  d-flex align-items-center justify-content-center p-0">
      <div
        className="hero-section d-flex flex-column justify-content-center align-items-start text-white px-5"
        style={{
          height: '60vh',
          width: '90vw',
          backgroundImage: `url(${trialimg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div>
          <h1>Welcome to AzureHub</h1>
           <p style={{ maxWidth: '600px' }}>
            Treat yourself to the perfect staycation at AzureHub — a relaxing escape close to home, with all the comfort and charm you need to unwind.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
