export default function PreviewScreen({ clipPath, reset }) {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4">
      <h2 className="text-2xl font-bold mb-4">✅ Your Clip is Ready!</h2>

      <video
        controls
        autoPlay
        loop
        muted
        src={clipPath}
        className="w-[300px] rounded-xl shadow-lg mb-6"
      />

      <div className="flex gap-4">
        <a
          href={clipPath}
          download
          className="bg-green-500 text-white px-5 py-2 rounded-lg shadow hover:bg-green-600 transition"
        >
          ⬇ Download
        </a>
        <button
          onClick={reset}
          className="bg-gray-300 text-black px-5 py-2 rounded-lg hover:bg-gray-400 transition"
        >
          🔁 Try Another
        </button>
      </div>
    </div>
  );
}
