export default function UploadScreen({ handleUpload }) {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-500 via-purple-600 to-indigo-800 flex flex-col items-center justify-center text-white px-4">
      <h1 className="text-4xl font-bold mb-6">🎬 ClipGenius</h1>
      <p className="mb-4 text-lg text-center max-w-lg">
        Turn your long-form videos into viral-ready TikToks & Reels in seconds with AI.
      </p>
      <label className="bg-white text-indigo-700 px-6 py-3 rounded-xl font-semibold cursor-pointer shadow hover:scale-105 transition">
        Select Video
        <input
          type="file"
          accept="video/*"
          className="hidden"
          onChange={(e) => handleUpload(e.target.files[0])}
        />
      </label>
    </div>
  );
}
