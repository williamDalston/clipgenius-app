import React from 'react';
import { Sparkles, ArrowRight, Palette } from 'lucide-react'; // Import necessary icons
import Button from '../Button'; // Import the reusable Button component
import { useAppStore } from '../../store/useAppStore'; // Import the Zustand store

// Define the props interface for the StylePresetCard component
interface StylePresetCardProps {
  preset: {
    id: string;
    name: string;
    emoji: string;
    desc: string;
  };
  selected: boolean; // Indicates if the preset is currently selected
  onClick: (id: string) => void; // Function to handle preset selection, passing the ID
}

// StylePresetCard component for displaying a style preset option.
// Allows users to select a styling option for their video.
const StylePresetCard: React.FC<StylePresetCardProps> = ({ preset, selected, onClick }) => (
  <button
    onClick={() => onClick(preset.id)} // Pass the preset ID to the onClick handler
    className={`
      p-4 rounded-xl border-2 transition-all text-left w-full
      ${selected
        ? 'border-blue-500 bg-blue-50 shadow-md' // Styles for the selected preset
        : 'border-gray-200 hover:border-gray-300 hover:shadow-sm' // Styles for unselected presets on hover
      }
    `}
    aria-pressed={selected} // ARIA attribute for accessibility
  >
    <div className="flex items-center space-x-3 mb-2">
      <span className="text-2xl">{preset.emoji}</span> {/* Emoji representing the style */}
      <span className="font-medium text-gray-900">{preset.name}</span> {/* Preset name */}
    </div>
    <p className="text-sm text-gray-600">{preset.desc}</p> {/* Preset description */}
  </button>
);

// StyleTab component handles the UI and logic for the video styling section
const StyleTab: React.FC = () => {
  // Access state and actions from the Zustand store
  const {
    setActiveTab,
    setProcessing,
    selectedStylePreset,
    setSelectedStylePreset,
    processing,
  } = useAppStore();

  // Data for predefined style presets that users can choose from.
  const stylePresets = [
    { id: 'viral', name: 'Viral Energy', emoji: '🔥', desc: 'Fast cuts, zooms, trending effects' },
    { id: 'professional', name: 'Clean Pro', emoji: '💼', desc: 'Minimal, elegant, business-ready' },
    { id: 'fun', name: 'Fun & Emotive', emoji: '😄', desc: 'Emojis, colorful captions, playful' },
    { id: 'educational', name: 'Educational', emoji: '🧠', desc: 'Clear, focused, informative style' }
  ];

  /**
   * Handles the "Generate Clips" action.
   * Simulates processing and then navigates to the 'export' tab.
   */
  const handleGenerateClips = () => {
    setProcessing(true); // Start processing animation

    // Simulate an API call or background processing delay
    setTimeout(() => {
      setProcessing(false); // End processing
      setActiveTab('export'); // Navigate to the 'Export' tab
    }, 3000); // Simulate a 3-second processing time
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Section Title and Description */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Style</h2>
        <p className="text-gray-600">AI will automatically apply captions, transitions, and effects</p>
      </div>

      {/* Style Presets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {stylePresets.map(preset => (
          <StylePresetCard
            key={preset.id}
            preset={preset}
            selected={selectedStylePreset === preset.id} // Check if this preset is selected
            onClick={setSelectedStylePreset} // Pass the action to update selected preset
          />
        ))}
      </div>

      {/* Custom Options Section */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Custom Options</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Caption Style Dropdown */}
          <div>
            <label htmlFor="caption-style" className="block text-sm font-medium text-gray-700 mb-2">Caption Style</label>
            <select id="caption-style" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500">
              <option>Bold & Dynamic</option>
              <option>Clean & Minimal</option>
              <option>Colorful & Fun</option>
            </select>
          </div>
          {/* Transitions Dropdown */}
          <div>
            <label htmlFor="transitions" className="block text-sm font-medium text-gray-700 mb-2">Transitions</label>
            <select id="transitions" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500">
              <option>Quick Cuts</option>
              <option>Smooth Fades</option>
              <option>Zoom Effects</option>
            </select>
          </div>
          {/* Music Dropdown */}
          <div>
            <label htmlFor="music" className="block text-sm font-medium text-gray-700 mb-2">Music</label>
            <select id="music" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500">
              <option>Upbeat</option>
              <option>Ambient</option>
              <option>No Music</option>
            </select>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="mt-6 flex justify-between">
          {/* Back to Highlights button */}
          <button
            onClick={() => setActiveTab('detect')} // Navigate back to 'Detect' tab
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            ← Back to Highlights
          </button>
          {/* Generate Clips button using the reusable Button component */}
          <Button
            onClick={handleGenerateClips}
            variant="primary"
            loading={processing} // Use processing state from hook
            icon={Sparkles}
            size="lg"
          >
            {processing ? 'Generating Clips...' : 'Generate Clips'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StyleTab;
