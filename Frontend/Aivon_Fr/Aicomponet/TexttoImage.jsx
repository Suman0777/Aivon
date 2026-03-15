import React, { useMemo, useState } from 'react'
import Api from '../Componet/Api'

const aspectRatios = [
    { label: 'Square', value: '1:1' },
    { label: 'Portrait', value: '4:5' },
    { label: 'Landscape', value: '16:9' },
    { label: 'Poster', value: '2:3' },
]

const styles = [
    'Cinematic',
    '3D Render',
    'Anime',
    'Photorealistic',
    'Concept Art',
    'Watercolor',
]

const promptIdeas = [
    'A floating city above the ocean at sunrise, cinematic lighting, ultra detailed',
    'A futuristic sports car in a neon alley during rain, realistic reflections',
    'A cozy mountain cabin with snowfall outside, warm golden interior light',
    'A cyberpunk samurai portrait with glowing armor and dramatic fog',
]

const responseKeys = ['imageUrl', 'url', 'image', 'output', 'result']

const extractImageUrl = (payload) => {
    if (!payload) return ''

    for (const key of responseKeys) {
        if (typeof payload[key] === 'string' && payload[key].trim()) {
            return payload[key]
        }
    }

    if (Array.isArray(payload.images) && typeof payload.images[0] === 'string') {
        return payload.images[0]
    }

    if (Array.isArray(payload.data) && typeof payload.data[0] === 'string') {
        return payload.data[0]
    }

    if (
        Array.isArray(payload.data) &&
        payload.data[0] &&
        typeof payload.data[0].url === 'string'
    ) {
        return payload.data[0].url
    }

    return ''
}

const TexttoImage = () => {
    const [prompt, setPrompt] = useState('')
    const [selectedStyle, setSelectedStyle] = useState(styles[0])
    const [selectedRatio, setSelectedRatio] = useState(aspectRatios[0].value)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [generatedImage, setGeneratedImage] = useState('')
    const [history, setHistory] = useState([])

    const trimmedPrompt = prompt.trim()

    const enhancedPrompt = useMemo(() => {
        if (!trimmedPrompt) return ''
        return `${trimmedPrompt}, ${selectedStyle.toLowerCase()} style, aspect ratio ${selectedRatio}`
    }, [trimmedPrompt, selectedStyle, selectedRatio])

    const requestImage = async (finalPrompt) => {
        const candidateEndpoints = [
            '/api/v1/ai/text-to-image',
            '/api/v1/ai/generate-image',
            '/api/v1/ai/image',
        ]

        for (const endpoint of candidateEndpoints) {
            try {
                const response = await Api.post(endpoint, {
                    prompt: finalPrompt,
                    style: selectedStyle,
                    aspectRatio: selectedRatio,
                })

                const imageUrl = extractImageUrl(response?.data)
                if (imageUrl) {
                    return imageUrl
                }
            } catch {
                // Try the next endpoint.
            }
        }

        throw new Error('No image was returned from the API.')
    }

    const handleGenerate = async (event) => {
        event.preventDefault()
        if (!trimmedPrompt || loading) return

        setLoading(true)
        setError('')

        try {
            const imageUrl = await requestImage(enhancedPrompt)
            setGeneratedImage(imageUrl)
            setHistory((prev) => [
                {
                    prompt: trimmedPrompt,
                    enhancedPrompt,
                    imageUrl,
                    style: selectedStyle,
                    ratio: selectedRatio,
                    createdAt: new Date().toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                    }),
                },
                ...prev,
            ].slice(0, 4))
        } catch (err) {
            setError(
                err.response?.data?.message ||
                    err.message ||
                    'Image generation is unavailable right now. Check the AI API route.'
            )
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-hidden">
            <img
                src="lodosss.png"
                alt="Aivon Logo"
                className="pointer-events-none absolute inset-0 h-screen w-[10000px] object-center opacity-5"
            />

            <div className="pointer-events-none absolute inset-0 opacity-30">
                <div
                    className="h-full w-full"
                    style={{
                        backgroundImage:
                            'radial-gradient(circle at top left, rgba(34,211,238,0.14), transparent 32%), radial-gradient(circle at right, rgba(59,130,246,0.12), transparent 28%)',
                    }}
                />
            </div>

            <div className="relative z-10 flex flex-1 flex-col px-4 pb-6 pt-20 sm:px-6 lg:px-8 lg:pt-8">
                <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                    <div className="max-w-3xl space-y-3">
                        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-400/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-cyan-200">
                            <i className="pi pi-sparkles text-xs" />
                            Prompt Studio
                        </span>
                        <div>
                            <h1 className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
                                Text-to-Image Workspace
                            </h1>
                            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                                Build a prompt, tune the visual direction, and generate artwork from one focused screen.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                        <div className="rounded-2xl border border-cyan-300/15 bg-slate-900/55 px-4 py-3 backdrop-blur-md">
                            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Style</p>
                            <p className="mt-2 text-sm font-medium text-slate-100">{selectedStyle}</p>
                        </div>
                        <div className="rounded-2xl border border-cyan-300/15 bg-slate-900/55 px-4 py-3 backdrop-blur-md">
                            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Ratio</p>
                            <p className="mt-2 text-sm font-medium text-slate-100">{selectedRatio}</p>
                        </div>
                        <div className="rounded-2xl border border-cyan-300/15 bg-slate-900/55 px-4 py-3 backdrop-blur-md col-span-2 sm:col-span-1">
                            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">History</p>
                            <p className="mt-2 text-sm font-medium text-slate-100">{history.length} recent</p>
                        </div>
                    </div>
                </div>

                <div className="grid flex-1 gap-6 xl:grid-cols-[1.1fr_0.9fr]">
                    <section className="rounded-[28px] border border-cyan-300/15 bg-slate-950/55 p-5 shadow-[0_0_40px_rgba(15,23,42,0.45)] backdrop-blur-xl sm:p-6">
                        <div className="flex flex-col gap-5">
                            <div>
                                <h2 className="text-lg font-semibold text-slate-50">Prompt Builder</h2>
                                <p className="mt-1 text-sm text-slate-400">
                                    Write the scene, then shape the output with a style preset and canvas ratio.
                                </p>
                            </div>

                            <form onSubmit={handleGenerate} className="space-y-5">
                                <div className="rounded-3xl border border-cyan-300/15 bg-slate-900/80 p-4 shadow-inner shadow-cyan-950/20">
                                    <label className="mb-3 block text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                                        Main Prompt
                                    </label>
                                    <textarea
                                        value={prompt}
                                        onChange={(event) => setPrompt(event.target.value)}
                                        placeholder="Describe the image you want to create. Include subject, mood, lighting, setting, and details that matter."
                                        rows={7}
                                        disabled={loading}
                                        className="min-h-40 w-full resize-none bg-transparent text-sm leading-7 text-slate-100 placeholder:text-slate-500 focus:outline-none"
                                    />

                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {promptIdeas.map((idea) => (
                                            <button
                                                key={idea}
                                                type="button"
                                                onClick={() => setPrompt(idea)}
                                                className="rounded-full border border-slate-700/70 bg-slate-950/60 px-3 py-1.5 text-xs text-slate-300 transition hover:border-cyan-300/30 hover:text-cyan-100"
                                            >
                                                Use idea
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid gap-4 lg:grid-cols-2">
                                    <div className="rounded-3xl border border-cyan-300/15 bg-slate-900/70 p-4">
                                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                                            Visual Style
                                        </p>
                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {styles.map((style) => (
                                                <button
                                                    key={style}
                                                    type="button"
                                                    onClick={() => setSelectedStyle(style)}
                                                    className={`rounded-full px-3 py-2 text-sm transition ${
                                                        selectedStyle === style
                                                            ? 'border border-cyan-300/40 bg-cyan-400/15 text-cyan-100 shadow-[0_0_18px_rgba(56,189,248,0.18)]'
                                                            : 'border border-slate-700/70 bg-slate-950/55 text-slate-300 hover:border-cyan-300/20 hover:text-slate-100'
                                                    }`}
                                                >
                                                    {style}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="rounded-3xl border border-cyan-300/15 bg-slate-900/70 p-4">
                                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                                            Aspect Ratio
                                        </p>
                                        <div className="mt-4 grid grid-cols-2 gap-2">
                                            {aspectRatios.map((ratio) => (
                                                <button
                                                    key={ratio.value}
                                                    type="button"
                                                    onClick={() => setSelectedRatio(ratio.value)}
                                                    className={`rounded-2xl border px-4 py-3 text-left transition ${
                                                        selectedRatio === ratio.value
                                                            ? 'border-cyan-300/40 bg-cyan-400/15 text-cyan-100'
                                                            : 'border-slate-700/70 bg-slate-950/55 text-slate-300 hover:border-cyan-300/20 hover:text-slate-100'
                                                    }`}
                                                >
                                                    <span className="block text-sm font-medium">{ratio.label}</span>
                                                    <span className="mt-1 block text-xs text-slate-500">{ratio.value}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-3xl border border-cyan-300/15 bg-slate-900/70 p-4">
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                                                Final Prompt Preview
                                            </p>
                                            <p className="mt-3 text-sm leading-7 text-slate-300">
                                                {enhancedPrompt || 'Your styled prompt preview will appear here once you start typing.'}
                                            </p>
                                        </div>
                                        <div className="hidden rounded-2xl border border-cyan-300/15 bg-slate-950/80 px-3 py-2 text-right text-xs text-slate-500 sm:block">
                                            <p>{trimmedPrompt.length} chars</p>
                                            <p className="mt-1">Ready for generation</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                    <p className="text-sm text-slate-400">
                                        Best results usually come from specific subjects, lighting, lens, environment, and mood.
                                    </p>
                                    <button
                                        type="submit"
                                        disabled={!trimmedPrompt || loading}
                                        className="inline-flex items-center justify-center gap-2 rounded-2xl border border-cyan-300/35 bg-linear-to-r from-cyan-400/80 to-blue-500/80 px-5 py-3 text-sm font-semibold text-slate-950 shadow-[0_0_22px_rgba(56,189,248,0.3)] transition hover:shadow-[0_0_28px_rgba(56,189,248,0.45)] disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {loading ? (
                                            <>
                                                <span className="h-4 w-4 rounded-full border-2 border-slate-950/30 border-t-slate-950 animate-spin" />
                                                Generating...
                                            </>
                                        ) : (
                                            <>
                                                <i className="pi pi-image text-sm" />
                                                Generate Image
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </section>

                    <section className="flex flex-col gap-6">
                        <div className="flex-1 rounded-[28px] border border-cyan-300/15 bg-slate-950/55 p-5 backdrop-blur-xl sm:p-6">
                            <div className="mb-5 flex items-center justify-between gap-4">
                                <div>
                                    <h2 className="text-lg font-semibold text-slate-50">Generated Output</h2>
                                    <p className="mt-1 text-sm text-slate-400">
                                        Your latest result appears here with a download link when generation succeeds.
                                    </p>
                                </div>
                                {generatedImage && (
                                    <a
                                        href={generatedImage}
                                        download="aivon-text-to-image.png"
                                        className="inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-400/10 px-3 py-2 text-xs font-medium text-cyan-100 transition hover:bg-cyan-400/20"
                                    >
                                        <i className="pi pi-download" />
                                        Download
                                    </a>
                                )}
                            </div>

                            <div className="flex min-h-[380px] items-center justify-center rounded-[24px] border border-dashed border-cyan-300/15 bg-slate-900/70 p-4">
                                {loading && (
                                    <div className="flex flex-col items-center gap-4 text-center">
                                        <div className="h-14 w-14 rounded-full border-4 border-cyan-400/20 border-t-cyan-400 animate-spin" />
                                        <div>
                                            <p className="text-sm font-medium text-slate-100">Rendering your concept</p>
                                            <p className="mt-1 text-xs text-slate-400">Aivon is turning the prompt into an image.</p>
                                        </div>
                                    </div>
                                )}

                                {!loading && error && (
                                    <div className="max-w-md rounded-3xl border border-red-500/25 bg-red-500/10 px-5 py-4 text-center">
                                        <p className="text-sm font-medium text-red-200">Generation failed</p>
                                        <p className="mt-2 text-sm leading-6 text-red-200/80">{error}</p>
                                    </div>
                                )}

                                {!loading && !error && generatedImage && (
                                    <div className="w-full space-y-4">
                                        <img
                                            src={generatedImage}
                                            alt="Generated from text prompt"
                                            className="max-h-[520px] w-full rounded-[24px] border border-cyan-300/15 object-cover shadow-[0_0_30px_rgba(56,189,248,0.12)]"
                                        />
                                        <div className="rounded-2xl border border-cyan-300/15 bg-slate-900/70 px-4 py-3 text-sm text-slate-300">
                                            <span className="text-slate-500">Prompt:</span> {enhancedPrompt}
                                        </div>
                                    </div>
                                )}

                                {!loading && !error && !generatedImage && (
                                    <div className="max-w-sm text-center">
                                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl border border-cyan-300/20 bg-cyan-400/10 text-cyan-200">
                                            <i className="pi pi-image text-2xl" />
                                        </div>
                                        <p className="text-sm font-medium text-slate-100">No image yet</p>
                                        <p className="mt-2 text-sm leading-6 text-slate-400">
                                            Start with a detailed prompt and generate your first image from this panel.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="rounded-[28px] border border-cyan-300/15 bg-slate-950/55 p-5 backdrop-blur-xl sm:p-6">
                            <div className="flex items-center justify-between gap-3">
                                <div>
                                    <h2 className="text-lg font-semibold text-slate-50">Recent Generations</h2>
                                    <p className="mt-1 text-sm text-slate-400">The latest successful prompts stay here for quick reuse.</p>
                                </div>
                                <span className="rounded-full border border-slate-700/60 px-3 py-1 text-xs text-slate-400">
                                    {history.length}/4 saved
                                </span>
                            </div>

                            <div className="mt-5 space-y-3">
                                {history.length === 0 && (
                                    <div className="rounded-2xl border border-dashed border-slate-700/70 px-4 py-5 text-sm text-slate-500">
                                        Generated images will appear here after a successful request.
                                    </div>
                                )}

                                {history.map((item) => (
                                    <button
                                        key={`${item.createdAt}-${item.prompt}`}
                                        type="button"
                                        onClick={() => {
                                            setPrompt(item.prompt)
                                            setSelectedStyle(item.style)
                                            setSelectedRatio(item.ratio)
                                            setGeneratedImage(item.imageUrl)
                                            setError('')
                                        }}
                                        className="flex w-full items-center gap-4 rounded-2xl border border-cyan-300/12 bg-slate-900/70 p-3 text-left transition hover:border-cyan-300/25 hover:bg-slate-900"
                                    >
                                        <img
                                            src={item.imageUrl}
                                            alt={item.prompt}
                                            className="h-16 w-16 rounded-xl object-cover"
                                        />
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-medium text-slate-100">{item.prompt}</p>
                                            <p className="mt-1 text-xs text-slate-500">
                                                {item.style} • {item.ratio} • {item.createdAt}
                                            </p>
                                        </div>
                                        <i className="pi pi-arrow-up-right text-slate-500" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default TexttoImage