import React from 'react'
import { SignIn } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

const SignInPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link 
            to="/" 
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
            <p className="text-gray-600 mt-2">Sign in to your ClipGenius account</p>
          </div>
          
          <SignIn 
            appearance={{
              elements: {
                formButtonPrimary: 'bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-lg transition-colors',
                card: 'bg-transparent shadow-none',
                headerTitle: 'text-xl font-bold text-gray-900',
                headerSubtitle: 'text-gray-600',
                socialButtonsBlockButton: 'bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium py-2 px-4 rounded-lg transition-colors',
                formFieldInput: 'border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
                footerActionLink: 'text-primary hover:text-primary/80',
              }
            }}
            redirectUrl="/app/upload"
          />
          
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/sign-up" className="text-primary hover:text-primary/80 font-medium">
                Sign up
              </Link>
            </p>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <Link 
                to="/creator" 
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                🎬 Explore Creator Studio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignInPage
