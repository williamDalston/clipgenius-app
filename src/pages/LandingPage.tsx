import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Scissors, Zap } from 'lucide-react'
import { useUser } from '@clerk/clerk-react'
import { motion } from 'framer-motion'

const LandingPage: React.FC = () => {
  const navigate = useNavigate()
  const { isSignedIn } = useUser()

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 font-sans flex flex-col items-center justify-center text-center px-4"
    >
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="flex items-center space-x-3 mb-6"
      >
        <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
          <Scissors className="text-white" />
        </div>
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          ClipGenius
        </h1>
      </motion.div>

      <motion.h2 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="text-2xl font-bold mb-4"
      >
        Transform Your Videos into
      </motion.h2>
      <motion.p 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="text-gray-600 max-w-md mb-8"
      >
        AI-powered video editing that automatically detects highlights, adds captions, and creates engaging clips ready for social media.
      </motion.p>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="flex flex-col sm:flex-row gap-4 mb-6"
      >
        <Link
          to="/app"
          className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition font-semibold inline-flex items-center justify-center"
        >
          🚀 Launch App
        </Link>
        <button
          className="bg-white text-gray-700 px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition font-semibold"
          onClick={() => navigate('/app/upload')}
        >
          ⚡ Start Creating
        </button>
        <Link
          to="/creator"
          className="bg-white text-gray-700 px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition font-semibold"
        >
          🎬 Creator Studio
        </Link>
      </motion.div>
      {!isSignedIn && (
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="flex space-x-4 mb-8"
        >
          <Link
            to="/sign-in"
            className="text-gray-600 hover:text-gray-900 underline"
          >
            Sign In
          </Link>
          <Link
            to="/sign-up"
            className="text-gray-600 hover:text-gray-900 underline"
          >
            Sign Up
          </Link>
        </motion.div>
      )}

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="mt-16 space-y-6 text-left max-w-md text-sm text-gray-700"
      >
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
        </motion.div>
      </motion.div>
    )
}

export default LandingPage
