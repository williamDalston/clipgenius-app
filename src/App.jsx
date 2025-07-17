import { useState } from "react";
import UploadScreen from "./components/UploadScreen";
import ProcessingScreen from "./components/ProcessingScreen";
import PreviewScreen from "./components/PreviewScreen";
import "./index.css";

export default function App() {
  // State flow: Upload → Processing → Preview
  const [videoFile, setVideoFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedClipUrl, setProcessedClipUrl] = useState(null);
  const [error, setError] = useState(null);

  // Upload handler
  const handleUpload = (file) => {
    if (!file) return;

    setVideoFile(file);
    setIsProcessing(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    fetch("http://localhost:8000/upload/", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        const url = `http://localhost:8000/download/${data.clip_path}`;
        setProcessedClipUrl(url);
        setIsProcessing(false);
      })
      .catch((err) => {
        console.error("Upload failed:", err);
        setError("Something went wrong. Please try again.");
        setIsProcessing(false);
      });
  };

  // Reset to initial state
  const handleReset = () => {
    setVideoFile(null);
    setIsProcessing(false);
    setProcessedClipUrl(null);
    setError(null);
  };

  return (
    <main className="min-h-screen font-sans bg-gradient-to-br from-black via-indigo-900 to-indigo-950 text-white">
      {/* Render state-specific screens */}
      {error ? (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
          <h1 className="text-2xl font-bold text-red-400 mb-4">⚠️ Upload Failed</h1>
          <p className="mb-6">{error}</p>
          <button
            onClick={handleReset}
            className="bg-red-500 px-6 py-2 rounded shadow hover:bg-red-600 transition"
          >
            Try Again
          </button>
        </div>
      ) : processedClipUrl ? (
        <PreviewScreen clipPath={processedClipUrl} reset={handleReset} />
      ) : isProcessing ? (
        <ProcessingScreen />
      ) : (
        <UploadScreen handleUpload={handleUpload} />
      )}
    </main>
  );
}
