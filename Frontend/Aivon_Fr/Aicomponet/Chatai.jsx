import React, { useEffect, useRef, useState } from 'react'
import { ShinyButton } from "@/components/ui/shiny-button"
import Api from '../Componet/Api'

const Chatai = () => {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      msg: "Hello! I'm Aivon, your AI assistant. How can I help you today?",
    },
  ])

  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const requestAiReply = async (userMessage) => {
    const candidateEndpoints = ['/api/v1/ai/chat', '/api/v1/chat', '/api/v1/ai']

    for (const endpoint of candidateEndpoints) {
      try {
        const response = await Api.post(endpoint, { message: userMessage })
        const replyText =
          response?.data?.reply ||
          response?.data?.message ||
          response?.data?.text ||
          response?.data?.result

        if (typeof replyText === 'string' && replyText.trim()) {
          return replyText
        }
      } catch {
        // Try the next endpoint.
      }
    }

    return "I received your message. I couldn't reach the AI endpoint right now, but your chat UI is working correctly."
  }

  const handleSend = async (e) => {
    e.preventDefault()
    const userMessage = input.trim()

    if (!userMessage || loading) return

    setMessages((prev) => [...prev, { role: 'user', msg: userMessage }])
    setInput('')
    setLoading(true)

    try {
      const aiReply = await requestAiReply(userMessage)
      setMessages((prev) => [...prev, { role: 'ai', msg: aiReply }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-screen w-full relative">

      {/* Logo Watermark */}
      <img
        src="lodosss.png"
        alt="Aivon Logo"
        className="absolute inset-0 w-[10000px] h-screen object-center opacity-5 pointer-events-none"
      />

      {/* Messages */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-4 p-6 relative z-10">
        {messages.map((msg, idx) => (
          <div
            key={`${msg.role}-${idx}`}
            className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm ${
                msg.role === 'user'
                  ? 'bg-cyan-500/20 text-cyan-100 border border-cyan-300/30'
                  : 'bg-slate-800/70 text-slate-100 border border-slate-700/70'
              }`}
            >
              {msg.msg}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex w-full justify-start">
            <div className="max-w-[85%] rounded-2xl px-4 py-3 bg-slate-800/70 text-slate-300 border border-slate-700/70">
              Aivon is typing...
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />

      </div>

      {/* Input */}
      <div className="sticky bottom-0 w-full px-6 py-5 bg-gradient-to-t from-[#030813]/95 via-[#030813]/70 to-transparent z-20">

        <form
          onSubmit={handleSend}
          className="mx-auto max-w-2xl flex items-center gap-3 rounded-xl border border-cyan-300/20 bg-slate-900/80 px-4 py-2 shadow-[0_0_24px_rgba(56,189,248,0.08)] backdrop-blur-md"
        >

          <input
            value={input}
            onChange={(e) => {
              setInput(e.target.value)
            }}
            type="text"
            placeholder="Ask Aivon anything..."
            disabled={loading}
            className="flex-1 bg-transparent text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
          />

          <ShinyButton 
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="text-slate-50 border-none bg-gradient-to-br from-cyan-400/80 to-blue-500/80 shadow-[0_0_12px_rgba(56,189,248,0.45)] hover:shadow-[0_0_24px_rgba(56,189,248,0.65)] ">
            <i className="pi pi-send text-white"></i>
          </ShinyButton>

        </form>

      </div>

    </div>
  )
}

export default Chatai