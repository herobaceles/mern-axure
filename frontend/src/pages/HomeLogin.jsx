import React from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import Pricing from './Pricing'
import Rooms from './Rooms'
import Footer from '@/components/Footer'
const Home = () => {
  return (
    <>

  
    <HeroSection />
    <Rooms />
    <Pricing />
    <Footer />
    </>
 
  )
}

export default Home
