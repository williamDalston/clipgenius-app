import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Scissors, Zap } from 'lucide-react'

const LandingPage: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 font-sans flex flex-col items-center justify-center text-center px-4">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
          <Scissors className="text-white" />
        </div>
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          ClipGenius
        </h1>
      </div>

      <h2 className="text-2xl font-bold mb-4">Transform Your Videos into</h2>
      <p className="text-gray-600 max-w-md mb-8">
        AI-powered video editing that automatically detects highlights, adds captions, and creates engaging clips ready for social media.
      </p>

      <button
        className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/90 transition mb-3"
        onClick={() => navigate('/app/upload')}
      >
        ⚡ Start Creating
      </button>
      <button
        className="text-black underline"
        onClick={() => navigate('/login')}
      >
        Sign In →
      </button>

      <div className="mt-16 space-y-6 text-left max-w-md text-sm text-gray-700">
        <div>
          <strong>📤 Upload Video</strong><br />
          Drag and drop your video file to get started
        </div>
        <div>
          <strong>🧠 AI Detection</strong><br />
          Our AI finds the best moments and highlights
        </div>
        <div>
          <strong>🎨 Choose Style</strong><br />
          Pick from viral, professional, or fun styles
        </div>
      </div>
    </div>
  )
}

export default LandingPage 