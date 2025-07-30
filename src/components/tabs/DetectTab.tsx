import React from 'react';
import { Play, Sparkles, TrendingUp, ArrowRight, RotateCcw, CheckCircle, Circle } from 'lucide-react';
import Button from '../Button'; // Import the reusable Button component
import { useAppStore } from '../../store/useAppStore'; // Import the Zustand store

// Define the props interface for the HighlightCard component
interface HighlightCardProps {
  highlight: {
    id: number;
    start: string;
    end: string;
    text: string;
    score: number;
    selected: boolean;
  };
  onToggle: (id: number) => void; // Function to toggle highlight selection
}

// HighlightCard component for displaying an individual AI-detected highlight.
// Allows users to select/deselect highlights.
const HighlightCard: React.FC<HighlightCardProps> = ({ highlight, onToggle }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-all">
    <div className="flex items-start justify-between mb-3">
      <div className="flex items-center space-x-3">
        {/* Button to toggle highlight selection */}
        <button
          onClick={() => onToggle(highlight.id)} // Pass highlight ID to onToggle
          className={`transition-all ${highlight.selected ? 'text-blue-600' : 'text-gray-400'}`}
        >
          {highlight.selected ? <CheckCircle size={20} /> : <Circle size={20} />}
        </button>
        <div>
          {/* Highlight time range */}
          <div className="text-sm font-medium text-gray-900">
            {highlight.start} - {highlight.end}
          </div>
          {/* Viral score indicator */}
          <div className="flex items-center space-x-2 mt-1">
            <div className="flex items-center space-x-1">
              <TrendingUp size={12} className="text-green-500" />
              <span className="text-xs text-green-600 font-medium">
                {Math.round(highlight.score * 100)}% viral
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Play button for the highlight segment */}
      <button className="text-gray-400 hover:text-blue-600 transition-colors">
        <Play size={16} />
      </button>
    </div>
    {/* Highlight text/description */}
    <p className="text-sm text-gray-700 leading-relaxed">{highlight.text}</p>
  </div>
);

// DetectTab component handles the UI and logic for the highlight detection section
const DetectTab: React.FC = () => {
  // Access state and actions from the Zustand store
  const { highlights, toggleHighlight, setActiveTab } = useAppStore();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Column: AI-Detected Highlights List */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">AI-Detected Highlights</h3>
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-yellow-500" />
              <span className="text-sm font-medium text-gray-700">
                {highlights.filter(h => h.selected).length} selected
              </span>
            </div>
          </div>

          <div className="space-y-4">
            {/* Map through highlights and render HighlightCard for each */}
            {highlights.map(highlight => (
              <HighlightCard
                key={highlight.id}
                highlight={highlight}
                onToggle={toggleHighlight} // Pass the toggleHighlight action from Zustand
              />
            ))}
          </div>

          <div className="mt-6 flex justify-between">
            {/* Re-analyze button */}
            <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
              <RotateCcw size={16} />
              <span>Re-analyze</span>
            </button>
            {/* Continue to Styling button using the reusable Button component */}
            <Button
              onClick={() => setActiveTab('style')} // Navigate to 'Style' tab
              variant="primary"
              icon={ArrowRight}
              iconPosition="right"
            >
              Continue to Styling
            </Button>
          </div>
        </div>
      </div>

      {/* Right Column: Video Preview and Virality Insights */}
      <div className="space-y-6">
        {/* Video Preview Card */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h4 className="font-bold text-gray-900 mb-4">Video Preview</h4>
          <div className="aspect-video bg-gray-900 rounded-lg mb-4 flex items-center justify-center">
            <Play className="w-12 h-12 text-white opacity-75" />
          </div>
          <div className="text-sm text-gray-600">
            <p><strong>Duration:</strong> 45:23</p>
            <p><strong>Transcript:</strong> Available</p>
            <p><strong>Language:</strong> English</p>
          </div>
        </div>

        {/* Virality Insights Card */}
        <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-6">
          <div className="flex items-center space-x-2 mb-3">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            <h4 className="font-bold text-gray-900">Virality Insights</h4>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-700">Engagement Score</span>
              <span className="text-sm font-semibold text-emerald-600">87%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-700">Best Topics</span>
              <span className="text-sm font-semibold text-blue-600">AI, Future</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-700">Optimal Length</span>
              <span className="text-sm font-semibold text-purple-600">15-30s</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetectTab;
