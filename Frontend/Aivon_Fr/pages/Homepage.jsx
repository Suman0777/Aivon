import React from 'react'
import Sidebar from '../Componet/Sidebar'

const Homepage = () => {
  return (
    <div>
        <h1 className='text-3xl font-bold underline'>
            Hi There 
        </h1>
        <div className='flex'>
            <Sidebar/>
        </div>
    </div>
  )
}

export default Homepage