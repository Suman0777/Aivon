import React from 'react'

const Midsection = () => {
  return (
    <div className="px-6 py-16 flex flex-col items-center text-center">
      
      {/* Heading */}
      <h1 className="font-sans text-5xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight max-w-4xl">
        Create amazing content with{" "}
        <span className="text-[#1253de]">Aivon Ai</span>
      </h1>

      {/* Paragraph */}
      <p className="mt-6 text-gray-600 text-sm sm:text-base md:text-sm max-w-xl font-medium text-center">
        Discover the power of AI with Aivon. Your all-in-one AI assistant.
        Chat with AI, remove backgrounds, generate images from text, and convert 
        text to voice, all in one seamless experience. 
        Unlock the full potential of AI with Aivon today.
      </p>

    </div>
  )
}

export default Midsection