import React from 'react'
import './App.css'
import { Route, Router, Routes } from 'react-router'
import Homepage from '../pages/Homepage'
import LoginPage from '../pages/LoginPage'
const App = () => {
  return (
    <div>
       <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
       </Routes>
    </div>
  )
}

export default App