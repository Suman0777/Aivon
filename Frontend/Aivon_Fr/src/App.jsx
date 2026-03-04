import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router'
import Homepage from '../pages/Homepage'
import LoginPage from '../pages/LoginPage'
import Dashboard from '../pages/Dashboard'
import ProtectedRoute from '../Componet/ProtectedRoute'
import { useAuth } from './context/AuthContext'

const App = () => {
  const { loading } = useAuth()

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <div>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/dashboard' element={<ProtectedRoute element={<Dashboard />} />} />
      </Routes>
    </div>
  )
}

export default App