import React from 'react'
import Navbar from '../Componet/Navbar'
import Midsection from '../Componet/Midsection'
import SecondLower from '../Componet/SecondLower'
import Footer from '../Componet/Footer'

const Homepage = () => {
  return (
    <div className="relative w-full overflow-x-hidden bg-linear-to-b from-[#02030a] via-[#040915] to-[#010106] text-slate-100">

      {/* HERO SECTION */}
      <section className="relative w-full overflow-hidden">

        {/* Futuristic glow atmosphere */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-cyan-400/25 blur-3xl sm:h-96 sm:w-96" />
          <div className="absolute -right-20 top-20 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl sm:h-96 sm:w-96" />
          <div className="absolute -bottom-32 left-1/3 h-80 w-80 rounded-full bg-fuchsia-500/15 blur-3xl sm:h-96 sm:w-96" />
        </div>

        {/* Neon grid overlay */}
        <div className="pointer-events-none absolute inset-0 z-0 opacity-25">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                'linear-gradient(rgba(34,211,238,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.12) 1px, transparent 1px)',
              backgroundSize: '56px 56px',
            }}
          />
        </div>

        {/* Hero panel */}
        <div
          className="relative z-10 h-screen w-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url("/gradientBackground.png")` }}
        >
          {/* Dark + neon tint to match futuristic theme */}
          <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-black/80 via-slate-950/70 to-cyan-950/60" />

          <div className="relative z-10">
            <Navbar />
            <Midsection />
          </div>
        </div>

        {/* Soft bridge into second section */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-36 bg-linear-to-b from-transparent via-[#040d1f]/80 to-[#020714]" />
      </section>

      {/* SECOND SECTION */}
      <section className="relative h-full w-full bg-linear-to-b from-[#020714] via-[#040b1b] to-[#01040d] px-4 pt-20">

        <div className="pointer-events-none absolute inset-0 opacity-70">
          <div className="absolute -top-10 right-0 h-64 w-64 rounded-full bg-cyan-400/15 blur-3xl" />
          <div className="absolute bottom-10 -left-8 h-72 w-72 rounded-full bg-violet-500/15 blur-3xl" />
        </div>

        <div className="relative z-10">
          <SecondLower />
          <Footer />
        </div>
      </section>

    </div>
  )
}

export default Homepage