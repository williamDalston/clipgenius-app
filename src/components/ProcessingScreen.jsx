export default function ProcessingScreen() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-black text-white px-4">
      <h2 className="text-3xl font-semibold mb-4">🔧 Processing your clip…</h2>
      <p className="mb-2 animate-pulse">🧠 Transcribing with Whisper...</p>
      <p className="mb-2 animate-pulse">🎯 Finding highlights...</p>
      <p className="mb-8 animate-pulse">✍️ Adding captions and formatting...</p>
      <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
        <div className="h-full w-3/4 bg-indigo-500 animate-pulse"></div>
      </div>
    </div>
  );
}
