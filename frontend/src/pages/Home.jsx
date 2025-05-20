import React from 'react'
import PropTypes from 'prop-types'
import HeroSection from '@/components/HeroSection'
import Rooms from './Rooms'
import Pricing from './Pricing'
import Footer from '@/components/Footer'
import About from './About'
const Home = props => {
  return (
    <>
   
      <HeroSection />


      <section id="rooms">
        <Rooms />
      </section>

      <section id="pricing">
        <Pricing />
      </section>
         <section id="about">
        <About />
      </section>
      <Footer />
    </>
  )
}



export default Home
