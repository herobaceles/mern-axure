import Rooms from './Rooms'
import React from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
 import Chatbot from '../components/Chatbot'
import Pricing from './Pricing'
import Footer from '@/components/Footer'
import About from './About'
import Bookings from './Bookings'
const DashboardPage = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
       <Chatbot /> 

      <section id="rooms">
        <Rooms />
      </section>

      <section id="bookings">
        <Bookings />
      </section>

      <section id="pricing">
        <Pricing />
      </section>

      <section id="about">
        <About />
      </section>
      <Footer />
    </>
  );
};

export default DashboardPage;
