import React from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'


const Home = () => {
  return (
    <>
    <Navbar />
    <HeroSection />

    <div className="text-center p-4 bg-blue-500 text-white">
  Tailwind CSS is working!
</div>
    </>
  )
}

export default Home
