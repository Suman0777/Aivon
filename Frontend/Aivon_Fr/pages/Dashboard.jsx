import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../src/context/AuthContext'
import Api from '../Componet/Api'
import Chatai from '../Aicomponet/Chatai'
import TextToVoiceGenerator from '../Aicomponet/TextToVoiceGenerator'
        
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import SidebarComponent from '../Componet/SidebarComponent'
import TexttoImage from '../Aicomponet/TexttoImage'
import BgRemover from '../Aicomponet/BgRemover'

const Dashboard = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeView, setActiveView] = useState('messages')

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await Api.get("/api/v1/user/getalluser")
      setUsers(response.data.users || [])
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to fetch users")
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <div className="relative flex min-h-screen w-full overflow-x-hidden bg-linear-to-b from-[#02030a] via-[#040915] to-[#010106] text-slate-100">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl sm:h-96 sm:w-96" />
        <div className="absolute -right-20 top-20 h-72 w-72 rounded-full bg-blue-500/15 blur-3xl sm:h-96 sm:w-96" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-fuchsia-500/10 blur-3xl sm:h-96 sm:w-96" />
      </div>

      <div className="pointer-events-none absolute inset-0 z-0 opacity-20">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              'linear-gradient(rgba(34,211,238,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.1) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
          }}
        />
      </div>

      {/* Main Content Area */}
      
      <div className='flex w-full h-full relative z-10'>
      
      {/* Slidebar */}
      <div className="lg:fixed">
      <SidebarComponent activeItem={activeView} onNavigate={setActiveView} />
      </div>

      <div className="flex flex-1 flex-col lg:ml-64">
        {activeView === 'messages' && <Chatai />}
        {activeView === 'imageGeneration' && <TextToVoiceGenerator />}
        {activeView === 'texttoimage' && <TexttoImage />}
        {activeView === 'bgremover' && <BgRemover />}
      </div>
      </div>

   </div>
  )
}

export default Dashboard