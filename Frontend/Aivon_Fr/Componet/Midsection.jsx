import React from 'react'
import { VideoText } from "@/components/ui/video-text"


const Midsection = () => {
  return (
    <div className="px-6  flex flex-col items-center text-center">
      
      {/* Heading */}
      <h1 className="  font-sans text-5xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight max-w-4xl text-gray-950">
        Create amazing content with{" "}
        {/* <span className="text-[#1253de]">Aivon Ai</span> */}
          <div className="relative h-[200px] w-full overflow-hidden">
            <VideoText src="https://cdn.magicui.design/ocean-small.webm">Aivon Ai</VideoText>
          </div>

      </h1>

      {/* Paragraph */}
      <p className="mt-6 text-gray-700 text-sm sm:text-base md:text-sm max-w-xl font-medium text-center">
        Discover the power of AI with Aivon. Your all-in-one AI assistant.
        Chat with AI, remove backgrounds, generate images from text, and convert 
        text to voice, all in one seamless experience. 
        Unlock the full potential of AI with Aivon today.
      </p>

    </div>
  )
}

export default Midsection