import React from "react"
import { motion } from "framer-motion"
import { VideoText } from "@/components/ui/video-text"
import { useNavigate } from "react-router"

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

const Midsection = () => {
  const navbar = useNavigate();
  
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="px-6 flex flex-col items-center text-center"
    >
      {/* Heading Section */}
      <div className="flex items-center justify-center gap-4 flex-wrap max-w-200">

        <motion.h1
          variants={fadeUp}
          className="font-sans text-6xl lg:text-8xl font-bold leading-tight text-slate-100 max-w-screen tracking-tight"
        >
          Create amazing content with
        </motion.h1>

        <motion.div
          variants={fadeUp}
          className="relative h-[100px] w-[450px] overflow-hidden mt-2"
        >
          <VideoText src="https://cdn.magicui.design/ocean-small.webm">
            Aivon Ai
          </VideoText>
        </motion.div>

      </div>

      {/* Paragraph */}
      <motion.p
        variants={fadeUp}
        className="mt-4 mb-4  text-slate-300 text-sm sm:text-base md:text-sm max-w-xl font-medium"
      >
        Discover the power of AI with Aivon. Your all-in-one AI assistant.
        Chat with AI, remove backgrounds, generate images from text, and convert
        text to voice, all in one seamless experience.
        Unlock the full potential of AI with Aivon today.
      </motion.p>

      {/* Mobile Button */}
      <motion.button
        variants={fadeUp}
        onClick={() => navbar('/login')}
        type="button"
        className="mt-6 md:hidden cursor-pointer border border-cyan-300/45 bg-cyan-400/10 text-cyan-100 hover:bg-cyan-400/20
                   text-sm
                   px-7
                   py-2
                   inline-flex items-center gap-2
                   
                   rounded-full
                   transition-all duration-300
                   shadow-[0_0_24px_rgba(34,211,238,0.25)]
                   hover:shadow-[0_0_28px_rgba(34,211,238,0.45)]"
      >
        <span>Get Started</span>

        <img
          src="arrow_icon.svg"
          alt="arrow"
          className="w-4 h-4"
        />
      </motion.button>

    </motion.div>
  )
}

export default Midsection