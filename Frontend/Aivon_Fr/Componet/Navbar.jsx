import React from 'react'
import { useNavigate } from 'react-router'
// import { assets } from '../public/assets'


const Navbar = () => {

  const navbar = useNavigate();
  return (
    <nav className="w-full px-4 sm:px-6 md:px-10">

      <div className="max-w-7xl mx-auto flex justify-between items-center ">

        {/* Logo */}
        <img
          src='lodosss.png'
          alt="Logo"
          className="h-36 w-auto object-contain"
        />

        {/* Button */}
        <button
          onClick={() => navbar('/login')}
          type='button'
          className="cursor-pointer border border-cyan-300/45 bg-cyan-400/10 text-cyan-100 hover:bg-cyan-400/20
                     text-xs sm:text-sm md:text-base
                     px-4 sm:px-5 md:px-6
                     py-2 sm:py-2.5
                     inline-flex items-center gap-2
                     rounded-full
                     transition-all duration-300 shadow-[0_0_24px_rgba(34,211,238,0.25)] hover:shadow-[0_0_28px_rgba(34,211,238,0.45)]"
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