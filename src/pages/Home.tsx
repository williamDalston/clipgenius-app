import React from 'react';
import { useTheme } from '../hooks/useTheme';
import { getThemeClasses } from '../lib/utils';

const Home: React.FC = () => {
  const { theme } = useTheme();
  const themeClasses = getThemeClasses(theme);

  return (
    <div className={`min-h-screen ${themeClasses.bg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Welcome to ClipGenius
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Transform your long-form videos into viral-ready clips with AI-powered editing.
            Save hours of manual work and create engaging content that performs.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="card p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎬</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">AI-Powered Editing</h3>
              <p className="text-gray-600">
                Automatically detect highlights and create engaging clips
              </p>
            </div>
            
            <div className="card p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Viral Optimization</h3>
              <p className="text-gray-600">
                Optimize for TikTok, Instagram, and YouTube algorithms
              </p>
            </div>
            
            <div className="card p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Lightning Fast</h3>
              <p className="text-gray-600">
                Process videos in minutes, not hours
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 