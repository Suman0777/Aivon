import React from "react"
import { motion } from "framer-motion"
import { VideoText } from "@/components/ui/video-text"

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
      ease: [0.22, 1, 0.36, 1], // smooth premium easing
    },
  },
}

const Midsection = () => {
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
          className="relative h-[100px] w-[450px] overflow-hidden"
        >
          <VideoText src="https://cdn.magicui.design/ocean-small.webm">
            Aivon Ai
          </VideoText>
        </motion.div>
      </div>

      {/* Paragraph */}
      <motion.p
        variants={fadeUp}
        className="mt-6 text-slate-300 text-sm sm:text-base md:text-sm max-w-xl font-medium"
      >
        Discover the power of AI with Aivon. Your all-in-one AI assistant.
        Chat with AI, remove backgrounds, generate images from text, and convert 
        text to voice, all in one seamless experience. 
        Unlock the full potential of AI with Aivon today.
      </motion.p>
    </motion.div>
  )
}

export default Midsection