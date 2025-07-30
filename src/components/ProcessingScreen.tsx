import React from 'react';
import { Loader2 } from 'lucide-react'; // Using Loader2 for a spinning animation

// ProcessingScreen component displays a full-page loading indicator
const ProcessingScreen: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 text-gray-800">
      <div className="text-center p-8 bg-white rounded-2xl shadow-xl border border-gray-200">
        <Loader2 className="w-16 h-16 text-blue-600 mx-auto mb-6 animate-spin" />
        <h2 className="text-2xl font-bold mb-3">Processing Your Video...</h2>
        <p className="text-gray-600 max-w-sm mx-auto">
          Please wait while our AI detects highlights, transcribes audio, and applies styles.
          This might take a few moments.
        </p>
        <div className="mt-6 text-sm text-gray-500">
          We're working hard to make your clips go viral!
        </div>
      </div>
    </div>
  );
};

export default ProcessingScreen;
