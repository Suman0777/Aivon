import React from "react";
import { motion } from "framer-motion";

const SecondLower = () => {
  const cardData = [
    {
      image: "/image_generation.png",
      title: "AI Chat",
      description:
        "Smart conversational AI to answer your questions instantly.",
    },
    {
      image: "/image_generation.png",
      title: "BG Remover",
      description:
        "Remove image backgrounds automatically with AI precision.",
    },
    {
      image: "/image_generation.png",
      title: "Text to Image",
      description:
        "Generate stunning images from simple text prompts.",
    },
    {
      image: "/image_generation.png",
      title: "Text to Voice",
      description:
        "Convert written text into natural-sounding voice.",
    },
    {
      image: "/image_generation.png",
      title: "Ai Article Writer",
      description:
        "Generate high-quality articles on any topic with AI writing assistance.",
    },
    {
      image: "/image_generation.png",
      title: "Prompt Generator",
      description:
        "Generate creative and effective prompts for your AI interactions.",
    },
  ];

  return (
    <div className="flex flex-col justify-center items-center w-full pt-24 pb-15 px-6">

      {/* Heading */}
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-bold text-slate-100">
          Powerful AI Tools
        </h1>

        <p className="text-slate-300 mt-5 text-sm md:text-base max-w-xl mx-auto pb-16">
          Everything you need to create, enhance, and optimize your content
          with cutting-edge AI technology.
        </p>
      </div>

      {/* Grid */}
      <div className="flex justify-center items-center grid w-full max-w-7xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {cardData.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.12 }}
            whileHover={{ y: -10, scale: 1.02 }}
            className=" w-[390px] group rounded-4xl border border-cyan-400/20 
            bg-slate-900/60 backdrop-blur-md p-6 
            transition-all duration-300 
            hover:border-cyan-400/40 
            hover:shadow-[0_0_30px_rgba(34,211,238,0.25)]
            flex flex-col items-center text-center
            "
          >
            {/* Icon */}
            <div className="w-14 h-14 rounded-xl 
            bg-gradient-to-tr from-cyan-400 to-blue-500 
            flex items-center justify-center 
            shadow-lg mb-5">

              <img
                src={card.image}
                alt={card.title}
                className="w-7 h-7 object-contain"
              />
            </div>

            {/* Title */}
            <h2 className="text-lg font-semibold text-slate-100">
              {card.title}
            </h2>

            {/* Description */}
            <p className="text-slate-400 text-sm mt-2 leading-relaxed">
              {card.description}
            </p>

          </motion.div>
        ))}

      </div>
    </div>
  );
};

export default SecondLower;