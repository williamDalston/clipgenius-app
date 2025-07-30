import React from 'react';
import { Play, Download, Share2 } from 'lucide-react'; // Import necessary icons
import Button from '../Button'; // Import the reusable Button component
import { useAppStore } from '../../store/useAppStore'; // Import the Zustand store

// ExportTab component handles the UI and logic for displaying and exporting generated clips.
const ExportTab: React.FC = () => {
  // Access state and actions from the Zustand store
  const { setActiveTab } = useAppStore();

  // Mock data for generated clips. In a real application, these would be actual video URLs
  // and metadata received after the processing step.
  const generatedClips = [
    { id: 1, duration: '0:18', viralScore: 87, optimizedFor: 'TikTok' },
    { id: 2, duration: '0:21', viralScore: 89, optimizedFor: 'Instagram' },
    { id: 3, duration: '0:24', viralScore: 91, optimizedFor: 'YouTube' }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Section Title and Description */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Clips Are Ready!</h2>
        <p className="text-gray-600">Download or share directly to social platforms</p>
      </div>

      {/* Grid of Generated Clips */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {generatedClips.map((clip) => (
          <div key={clip.id} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            {/* Video Preview Placeholder */}
            <div className="aspect-video bg-gray-900 relative flex items-center justify-center">
              <Play className="w-12 h-12 text-white opacity-75" /> {/* Play icon overlay */}
              <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                {clip.duration} {/* Display clip duration */}
              </div>
            </div>
            <div className="p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Clip {clip.id}</h4>
              <p className="text-sm text-gray-600 mb-4">
                Viral score: {clip.viralScore}% • {clip.optimizedFor} optimized
              </p>
              <div className="flex space-x-2">
                {/* Download Button */}
                <Button
                  variant="primary"
                  size="sm"
                  icon={Download}
                  className="flex-1"
                  onClick={() => console.log(`Downloading Clip ${clip.id}`)} // Placeholder for download logic
                >
                  Download
                </Button>
                {/* Share Button */}
                <Button
                  variant="secondary"
                  size="sm"
                  icon={Share2}
                  className="flex-1"
                  onClick={() => console.log(`Sharing Clip ${clip.id}`)} // Placeholder for share logic
                >
                  Share
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upgrade to Pro Call to Action */}
      <div className="mt-8 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h3 className="font-bold text-gray-900 mb-1">Ready to go viral?</h3>
            <p className="text-gray-600">Remove watermarks and unlock batch export with Pro</p>
          </div>
          <Button
            variant="primary" // Using primary variant for a strong CTA
            size="lg"
            onClick={() => console.log('Navigate to Upgrade Page')} // Placeholder for upgrade navigation
            className="bg-gradient-to-r from-purple-600 to-blue-600" // Specific gradient for upgrade button
          >
            Upgrade to Pro
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExportTab;
