import React, { useRef, useState } from 'react'
import Api from '../Componet/Api'

const responseKeys = ['imageUrl', 'url', 'image', 'output', 'result']

const extractImageUrl = (payload) => {
  if (!payload) return ''

  for (const key of responseKeys) {
    if (typeof payload[key] === 'string' && payload[key].trim()) {
      return payload[key]
    }
  }

  if (payload?.data && typeof payload.data.url === 'string') {
    return payload.data.url
  }

  if (
    Array.isArray(payload?.images) &&
    typeof payload.images[0] === 'string' &&
    payload.images[0].trim()
  ) {
    return payload.images[0]
  }

  return ''
}

const BgRemover = () => {
  const fileInputRef = useRef(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [resultImage, setResultImage] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const requestBackgroundRemoval = async (file) => {
    const endpoints = [
      '/api/v1/ai/remove-bg',
      '/api/v1/ai/bg-remove',
      '/api/v1/ai/background-remover',
    ]

    for (const endpoint of endpoints) {
      const formData = new FormData()
      formData.append('image', file)
      formData.append('file', file)

      try {
        const response = await Api.post(endpoint, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })

        const imageUrl = extractImageUrl(response?.data)
        if (imageUrl) {
          return imageUrl
        }
      } catch {
        // Try next endpoint.
      }
    }

    throw new Error('Background remover API is not available right now.')
  }

  const handleFileSelect = async (event) => {
    const file = event.target.files?.[0]
    if (!file || loading) return

    setSelectedFile(file)
    setError('')
    setResultImage('')
    setLoading(true)

    try {
      const generatedImage = await requestBackgroundRemoval(file)
      setResultImage(generatedImage)
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to remove background.')
    } finally {
      setLoading(false)
    }
  }

  const openFilePicker = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-hidden">
      <img
        src="lodosss.png"
        alt="Aivon Logo"
        className="pointer-events-none absolute inset-0 h-screen w-[10000px] object-center opacity-5"
      />

      <div className="relative z-10 flex flex-1 items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex h-[320px] w-[320px] max-w-[90vw] max-h-[90vw] flex-col items-center justify-center rounded-[40px] border border-cyan-300/25 bg-slate-900/65 p-5 text-center shadow-[0_0_30px_rgba(56,189,248,0.15)] backdrop-blur-md sm:h-[380px] sm:w-[380px]">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />

          {loading && (
            <div className="flex flex-col items-center gap-3 text-slate-300">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-cyan-400/30 border-t-cyan-300" />
              <span className="text-sm">Removing background...</span>
            </div>
          )}

          {!loading && resultImage && (
            <img
              src={resultImage}
              alt="Background removed result"
              className="h-full w-full rounded-[28px] object-contain"
            />
          )}

          {!loading && !resultImage && (
            <div className="flex flex-col items-center gap-3">
              <button
                type="button"
                onClick={openFilePicker}
                className="rounded-full border border-cyan-300/30 bg-cyan-400/15 px-5 py-2 text-sm font-medium text-cyan-100 transition hover:bg-cyan-400/25"
              >
                Upload Image
              </button>
              {selectedFile && <p className="text-xs text-slate-400">{selectedFile.name}</p>}
              {!selectedFile && <p className="text-xs text-slate-500">PNG or JPG</p>}
            </div>
          )}
        </div>
      </div>

      {error && (
        <p className="relative z-10 mt-2 px-4 pb-6 text-center text-sm text-red-300">
          {error}
        </p>
      )}
    </div>
  )
}

export default BgRemover