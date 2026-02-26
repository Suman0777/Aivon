import React from 'react'

const SecondLower = () => {

    const cardData = [
        {
            img: '',
            title: '',
            description: ''
        },{
            img: '',
            title: '',
            description: ''
        },{
            img: '',
            title: '',
            description: ''
        },{
            img: '',
            title: '',
            description: ''
        }
    ]


  return (
    <div className=' flex justify-center items-center flex-col w-full h-full'>
        <div >
            <h1 className='text-3xl font-bold font-sans '>
                Aivon Provide Ai Tool
            </h1>
            <p className='text-lg text-gray-500 mt-2'>
                Everything you need to create, edit, enhance and optimise your content with cutting-edge Ai technology.
            </p>
        </div>
        <div className='grid grid-cols-3 gap-4 mt-6 shadow-2xl p-4'>
            {cardData.map((card, index) => (
                <div key={index} className='bg-white rounded-lg shadow-md p-4'>
                    <img src={card.img} alt={card.title} className='w-full h-40 object-cover rounded-md mb-4' />
                    <h2 className='text-xl font-semibold mb-2'>{card.title}</h2>
                    <p className='text-gray-600'>{card.description}</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default SecondLower