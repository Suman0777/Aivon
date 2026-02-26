import React from 'react'
import Navbar from '../Componet/Navbar'
import Midsection from '../Componet/Midsection'
import SecondLower from '../Componet/SecondLower'
import { RetroGridDemo } from '../SmallComponet/RetroGridDemo'
import { RetroGrid } from "@/components/ui/retro-grid"

const Homepage = () => {
  return (
    <div className="w-full overflow-x-hidden">
      <RetroGrid/>
      {/*Nav +  Midsection */}
      <div className="w-full min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage:  `url("gradientBackground.png")`}}
      > 
      <Navbar />
        <div className="p-4">
          <Midsection />
        </div>
        
      </div>

      {/* Second Section */}
      <div className="w-full px-4">
        <SecondLower />
      </div>

    </div>
  )
}

export default Homepage