import React from 'react'
import './App.css'
import { Route, Router, Routes } from 'react-router'
import Homepage from '../pages/Homepage'

const App = () => {
  return (
    <div>
       <Routes>
        <Route path='/' element={<Homepage/>}/>
       </Routes>
    </div>
  )
}

export default App