import React from 'react'
import Navbar from '../Componet/Navbar'
import Midsection from '../Componet/Midsection'
import SecondLower from '../Componet/SecondLower'
import { RetroGrid } from "@/components/ui/retro-grid"

const Homepage = () => {
  return (
    <div className="w-full overflow-x-hidden">

      {/* Hero Section */}
      <section className="relative w-full min-h-screen overflow-hidden">

        {/* Background Grid */}
        <RetroGrid />

        {/* Content Layer */}
        <div
          className="relative z-10 w-full min-h-screen bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url("/gradientBackground.png")` }}
        >
          <Navbar />
          <Midsection />
        </div>

      </section>

      {/* Second Section */}
      <section className="w-full px-4 ">
        <SecondLower />
      </section>

    </div>
  )
}

export default Homepage