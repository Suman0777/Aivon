import React, { useState } from 'react'
import Api from '../Componet/Api'
import { ShinyButton } from '@/components/ui/shiny-button'

const TextToVoiceGenerator = () => {
  const [prompt, setPrompt] = useState('')
  const [voiceUrl, setVoiceUrl] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const MIN_len = 10;
  const MAX_len = 700;
  const [usage, setUsage] = useState({
    used: 0,
    limit: 5
  });

  const handleGenerate = async (e) => {
    e.preventDefault()

    const trimmed = prompt.trim()

    if (!trimmed || loading) return

    if(trimmed.length < MIN_len) {
      return setError("Your prompt is too short. Please provide a more detailed description of the voice you want to generate. Minimum length is 10 characters.");
    }
    
    if (trimmed.length > MAX_len) {
      return setError("Your prompt exceeds the maximum allowed length of 700 characters. Please shorten it and try again.");
    }
    
    if(usage.used >= usage.limit){
      return setError("You have reached the maximum number of generation requests for today. Please try again tomorrow.");
    }
    setLoading(true)
    setError('')
    setVoiceUrl(null)

    try {
      const response = await Api.post('/api/v1/voices/generate-voice', 
        { prompt: trimmed },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
          responseType: 'blob'
        }
      )
      
      const url = URL.createObjectURL(response.data)
      
      if (url) {
        setVoiceUrl(url)
        setPrompt('');
        setUsage({
          used: parseInt(response.headers['x-usage-used'] ?? usage.used + 1),
          limit: parseInt(response.headers['x-usage-limit'] ?? usage.limit),
        })
      } else {
        setError('No voice clip was returned from the server.')
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Failed to generate voice clip. Please try again.'
      )
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

      {/* Header */}
      <div className="relative z-10 max-w-screen px-6 pt-8 pb-4 flex items-center justify-between gap-3.5">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Text-To-voice Generation</h1>
          <p className="text-sm text-slate-400 mt-1">Describe what you want to hear from Aivon we will generate it.....</p>
        </div>
        <div className="flex h-10 w-5 mr-3 items-center justify-center rounded-full bg-linear-to-br from-cyan-400 to-blue-500 text-white font-semibold shadow-[0_0_12px_rgba(56,189,248,0.4)] md:mr-0 px-3 text-xs">
            {usage.used} / {usage.limit}
        </div>        
      </div>

      {/* voice clip preview area */}
      <div className="flex-1 max-w-screen overflow-y-auto relative z-10 flex items-center justify-center px-6 pb-4">
        {loading && (
          <div className="flex flex-col items-center gap-3 text-slate-400">
            <div className="h-12 w-12 rounded-full border-4 border-cyan-400/30 border-t-cyan-400 animate-spin" />
            <span className="text-sm">Generating your voice clip…</span>
          </div>
        )}

        {!loading && error && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-6 py-4 text-red-300 text-sm max-w-md text-center">
            {error}
          </div>
        )}

        {!loading && !error && voiceUrl && (
          <div className="flex flex-col items-center gap-4">
            <audio controls
              src={voiceUrl}
              alt="Generated"
              className="max-h-[60vh] max-w-full rounded-2xl border border-cyan-300/20 shadow-[0_0_40px_rgba(56,189,248,0.15)] object-contain"
            />
            <a
              href={voiceUrl}
              download="aivon-voice.flac"
              className="text-xs text-cyan-400 hover:text-cyan-200 transition-colors"
            >
              Download voice clip
            </a>
          </div>
        )}

        {!loading && !error && !voiceUrl && (
          <div className=" max-w-screen mr-5 text-slate-600 text-sm select-none rounded-xl border border-green-500/30 bg-green-500/10 px-6 py-4 text-green-300 text-sm max-w-xl gap-1.5 flex flex-col items-start md:mr-0 ">
          <i className="pi pi-info-circle text-green-400 text-sm py-1"><span className="px-2 font-bold text-green-400 font-sans">Note:</span></i> 
          <p className='font-sans'>
            - 500-700 characters limit are there for free tier!
          </p>

          <p className='font-sans'>
            - This service allows up to <span className="font-bold text-blue-400">5</span> generation requests per day.
          </p>
          </div>
        )}
      </div>

      {/* Prompt input */}
      <div className=" max-w-screen sticky bottom-0 w-full px-6 py-5 bg-gradient-to-t from-[#030813]/95 via-[#030813]/70 to-transparent z-20">
        <form
          onSubmit={handleGenerate}
          className="mx-auto max-w-2xl flex items-center gap-3 rounded-xl border border-cyan-300/20 bg-slate-900/80 px-4 py-2 shadow-[0_0_24px_rgba(56,189,248,0.08)] backdrop-blur-md"
        >
          <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            type="text"
            placeholder="Describe the text you want to convert to voice…"
            disabled={loading || usage.used >= usage.limit }
            className="flex-1 bg-transparent text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
          />
          <ShinyButton
            onClick={handleGenerate}
            disabled={loading || !prompt.trim() || usage.used >= usage.limit }
            className=" relative right-21 lg:static  text-slate-50 border-none bg-gradient-to-br from-cyan-400/80 to-blue-500/80 shadow-[0_0_12px_rgba(56,189,248,0.45)] hover:shadow-[0_0_24px_rgba(56,189,248,0.65)]"
          >
            <i className="pi pi-microphone text-white"></i>
          </ShinyButton>
        </form>
      </div>

    </div>
  )
}

export default TextToVoiceGenerator
