import React, { useState } from 'react';

interface UploadFormProps {
  onUpload: (file: File) => void;
}

const UploadForm: React.FC<UploadFormProps> = ({ onUpload }) => {
  // State to track if a file is being dragged over the drop zone for visual feedback
  const [dragOver, setDragOver] = useState(false);

  /**
   * Handles the selected file, either from drag-and-drop or file input.
   * @param file The File object to be uploaded.
   */
  const handleFile = (file: File | null) => {
    if (file) {
      // You might want to add client-side validation here (e.g., file type, size)
      onUpload(file);
    }
  };

  /**
   * Handles files dropped onto the drop zone.
   * @param e The React DragEvent.
   */
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false); // Reset drag over state
    // Get the first file from the data transfer, if any
    handleFile(e.dataTransfer.files?.[0] ?? null);
  };

  /**
   * Handles the change event from the file input.
   * This function is directly called when the user selects a file via the input.
   * @param e The React ChangeEvent from the input element.
   */
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Get the first file from the input, if any
    handleFile(e.target.files?.[0] ?? null);
    // Clear the input value to allow re-uploading the same file if needed
    e.target.value = '';
  };

  return (
    <div
      // The main div acts as the visual drop zone and clickable area.
      // The actual file input will be placed transparently on top of it.
      onDragOver={(e) => {
        e.preventDefault(); // Necessary to allow drop
        setDragOver(true); // Set drag over state for visual feedback
      }}
      onDragLeave={() => setDragOver(false)} // Reset drag over state
      onDrop={handleDrop} // Handle file drop
      // Apply dynamic styling based on dragOver state
      className={`
        relative overflow-hidden cursor-pointer // Important: relative for input positioning, overflow-hidden to contain input
        border-4 border-dashed rounded-xl p-12 text-center transition-all
        ${dragOver ? 'border-blue-400 bg-blue-50 shadow-lg' : 'border-gray-300 bg-white shadow-md'}
        hover:border-blue-400 hover:bg-blue-50/50
      `}
      role="button" // Indicate that this div is interactive for accessibility
      tabIndex={0} // Make it focusable for keyboard navigation
      // Note: The onKeyDown for Enter/Space is typically handled by the native
      // input element when it's directly clickable and focusable.
      // We rely on the transparent input overlaying this div to capture clicks/keyboard events.
    >
      {/* Text content for the drop zone. pointer-events-none ensures clicks pass through to the input. */}
      <p className="text-lg font-semibold text-gray-800 pointer-events-none">Drag & drop your video here</p>
      <p className="text-sm text-gray-500 mt-2 pointer-events-none">
        Or click to select a file. Supports MP4, MOV, AVI up to 500MB.
      </p>

      {/*
        This is the file input element.
        It's positioned absolutely to cover the entire parent div,
        and its opacity is set to 0 to make it transparent.
        Because it's still a real, interactive element, it will correctly
        capture clicks and drag-and-drop events without triggering
        unwanted native overlays.
      */}
      <input
        type="file"
        onChange={handleFileInputChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" // z-10 ensures it's above the text but below any other overlays
        accept="video/mp4,video/quicktime,video/x-msvideo" // Specify accepted video types
      />
    </div>
  );
};

export default UploadForm;
