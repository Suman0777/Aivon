import React from 'react'

const SecondLower = () => {

    const cardData = [
        {
            img: '',
            title: 'AI Chat',
            description: 'Smart conversational AI to answer your questions instantly.'
        },
        {
            img: '',
            title: 'BG Remover',
            description: 'Remove image backgrounds automatically with AI precision.'
        },
        {
            img: '',
            title: 'Text to Image',
            description: 'Generate stunning images from simple text prompts.'
        },
        {
            img: '',
            title: 'Text to Voice',
            description: 'Convert written text into natural-sounding voice.'
        }
    ]

  return (
    <div className='flex flex-col items-center w-full py-16 px-4'>
        
        {/* Heading Section */}
        <div className='text-center max-w-2xl'>
            <h1 className='text-3xl md:text-5xl font-bold text-gray-700'>
                Aivon Provide AI Tools
            </h1>
            <p className='text-gray-600 mt-3 font-medium'>
                Everything you need to create, edit, enhance or optimise your content with cutting-edge AI technology.
            </p>
        </div>

        {/* Grid Section */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12 w-full max-w-6xl'>
            {cardData.map((card, index) => (
                <div 
                    key={index} 
                    className='bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition duration-300'
                >
                    <div className='h-40 bg-gray-100 rounded-lg mb-4 flex items-center justify-center'>
                        {card.img ? (
                            <img src={card.img} alt={card.title} className='h-full w-full object-cover rounded-lg' />
                        ) : (
                            <span className='text-gray-400'>Image</span>
                        )}
                    </div>

                    <h2 className='text-xl font-semibold mb-2'>
                        {card.title}
                    </h2>

                    <p className='text-gray-600 text-sm'>
                        {card.description}
                    </p>
                </div>
            ))}
        </div>

    </div>
  )
}

export default SecondLower