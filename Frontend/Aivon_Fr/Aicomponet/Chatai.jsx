import React, { useState } from 'react'
import { ShinyButton } from "@/components/ui/shiny-button"
import { Plus, MessageCircle, Trash2 } from 'lucide-react'
import SidebarComponent from '../Componet/SidebarComponent'

const Chatai = () => {
    const [messages, setMessages] = useState([])
    const [chatHistory, setChatHistory] = useState([
      { id: 1, title: 'Chat 1', date: 'Today' },
      { id: 2, title: 'Chat 2', date: 'Yesterday' },
      { id: 3, title: 'Chat 3', date: 'This week' },
    ])
  return (
    <div className="flex h-screen w-full bg-linear-to-b from-[#02030a] via-[#040915] to-[#010106]">
          {/* Sidebar - Fixed on lg screens */}
          <div className="lg:fixed lg:left-0 lg:top-0 lg:h-screen lg:w-64 lg:z-40">
            <SidebarComponent />
          </div>

          {/* Messages History Panel - Fixed next to sidebar on lg screens */}
          <div className="hidden lg:fixed lg:left-64 lg:top-0 lg:h-screen lg:w-64 lg:flex lg:flex-col lg:border-r lg:border-cyan-300/20 lg:bg-slate-900/50 lg:backdrop-blur-md">
      
            {/* New Chat Button */}
            <div className="p-4 border-b border-cyan-300/20">
              <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-cyan-500/20 px-4 py-2 text-sm font-medium text-cyan-300 transition-colors hover:bg-cyan-500/30">
                <Plus size={18} />
                <span>New Chat</span>
              </button>
            </div>

            {/* Chat History */}
            <div className="flex-1 overflow-y-auto p-3">
              <div className="space-y-2">
                {chatHistory.map((chat) => (
                  <div
                    key={chat.id}
                    className="group flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-800/50 cursor-pointer"
                  >
                    <MessageCircle size={16} className="flex-shrink-0" />
                    <div className="flex-1 truncate">
                      <p className="truncate font-medium">{chat.title}</p>
                      <p className="text-xs text-slate-500">{chat.date}</p>
                    </div>
                    <button className="flex-shrink-0 opacity-0 transition-opacity group-hover:opacity-100">
                      <Trash2 size={14} className="text-red-400/60 hover:text-red-400" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Chat Area */}
          <div className="flex flex-1 flex-col lg:ml-128 relative">
      
            {/* Logo Watermark Background */}
            <img
              src="pocket.png"
              alt="Aivon Logo"
              className="absolute inset-0 w-full h-full object-center opacity-5 pointer-events-none"
            />

            {/* Chat Messages Area */}
            <div className="flex-1 overflow-y-auto relative z-10 flex flex-col gap-4 p-6">
              {messages.length === 0 ? (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <h2 className="text-2xl font-semibold text-slate-300 mb-2">Welcome to Aivon</h2>
                    <p className="text-slate-400">Start a conversation below</p>
                  </div>
                </div>
              ) : (
                messages.map((msg, idx) => (
                  <div key={idx} className="mb-4">
                    {msg}
                  </div>
                ))
              )}
            </div>

            {/* Bottom Input Bar */}
            <div className="sticky bottom-0 w-full px-6 py-5 bg-gradient-to-t from-[#030813]/95 via-[#030813]/70 to-transparent relative z-20">
              <div className="mx-auto max-w-2xl flex items-center gap-3 rounded-xl border border-cyan-300/20 bg-slate-900/80 px-4 py-2 shadow-[0_0_24px_rgba(56,189,248,0.08)] backdrop-blur-md">
                <input
                  type="text"
                  placeholder="Ask Aivon anything..."
                  className="flex-1 bg-transparent text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
                />
                <ShinyButton className="text-slate-50 border-none bg-white/20">
                  <i className="pi pi-send"></i>
                </ShinyButton>
              </div>
            </div>
          </div>
    </div>
  )
}

export default Chatai