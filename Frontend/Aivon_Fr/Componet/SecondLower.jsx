import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

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
    <div className="flex flex-col items-center w-full py-24 px-6 ">
      
      {/* Heading */}
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-100 font-sans">
          Powerful AI Tools
        </h1>
        <p className="text-slate-300 mt-4 text-sm sm:text-base md:text-sm max-w-xl font-medium">
          Everything you need to create, enhance, and optimize your content
          with cutting-edge AI technology.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-20 w-full max-w-6xl">
        {cardData.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -8 }}
            className="rounded-2xl border border-cyan-300/20 bg-slate-900/55 p-8 shadow-[0_0_16px_rgba(34,211,238,0.12)] backdrop-blur-sm transition-all duration-300 hover:border-cyan-300/40 hover:shadow-[0_0_24px_rgba(34,211,238,0.24)]"
          >
            {/* Icon Container */}
            <div className="w-14 h-14 rounded-xl bg-linear-to-tr from-cyan-400 to-blue-500 flex items-center justify-center shadow-[0_0_18px_rgba(56,189,248,0.45)]">
              <img
                src={card.image}
                alt={card.title}
                className="w-7 h-7 object-contain"
              />
            </div>

            {/* Content */}
            <h2 className="text-lg font-semibold mt-6 text-slate-100">
              {card.title}
            </h2>

            <p className="text-slate-300 text-sm mt-3 leading-relaxed">
              {card.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SecondLower;