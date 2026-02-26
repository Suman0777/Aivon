import React from 'react'
// import { assets } from '../public/assets'

const Navbar = () => {
  return (
    <nav className="w-full px-4 sm:px-6 md:px-10 ">

      <div className="max-w-7xl mx-auto flex justify-between items-center ">

        {/* Logo */}
        <img
          src='lodoss.png'
          alt="Logo"
          className="h-36 w-auto object-contain"
        />

        {/* Button */}
        <button
          type="button"
          className="text-white bg-[#1253de] hover:bg-[#0f44c5]
                     text-xs sm:text-sm md:text-base
                     px-4 sm:px-5 md:px-6
                     py-2 sm:py-2.5
                     inline-flex items-center gap-2
                     rounded-full
                     transition-all duration-300"
        >
          <span className="hidden md:inline">Get Started</span>

          <img
            src='arrow_icon.svg'
            alt="arrow"
            className="w-3 h-3 sm:w-4 sm:h-4"
          />
        </button>

      </div>

    </nav>
  )
}

export default Navbar