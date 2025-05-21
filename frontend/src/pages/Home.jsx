import React from 'react'
import PropTypes from 'prop-types'
import HeroSection from '@/components/HeroSection'
import Rooms from './Rooms'
import Pricing from './Pricing'
import Footer from '@/components/Footer'
import About from './About'
import LoginPromptFooter from '@/components/LoginPromptFooter'
// import Chatbot from '@/components/Chatbot'
const Home = props => {
  return (
    <>
   
      <HeroSection />
      {/* <Chatbot /> */}

      <LoginPromptFooter />
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
