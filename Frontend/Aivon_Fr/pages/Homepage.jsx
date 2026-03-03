import React from 'react'
import Navbar from '../Componet/Navbar'
import Midsection from '../Componet/Midsection'
import SecondLower from '../Componet/SecondLower'
import { RetroGrid } from "@/components/ui/retro-grid"
import Footer from '../Componet/Footer'

const Homepage = () => {
  return (
    <div className="w-full overflow-x-hidden bg-gray-100 relative">

      {/* HERO SECTION */}
      <section className="relative w-full overflow-hidden">

        {/* Background Grid */}
        <RetroGrid />

        {/* Background Gradient */}
        <div
          className="relative z-10 w-full bg-cover bg-center bg-no-repeat h-screen "
          style={{ backgroundImage: `url("/gradientBackground.png")` }}
        >
          <Navbar />
          <Midsection />          
        </div>
      </section>

      {/* SECOND SECTION */}
      <section
        className="relative w-full px-4 pt-20  bg-cover bg-center bg-no-repeat h-full " 
        style={{ backgroundImage: `url("/gradientBackground.png")` }}
      >

        <SecondLower />
        <Footer/>
      </section>

    </div>
  )
}

export default Homepage