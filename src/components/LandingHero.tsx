import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function LandingHero() {
  return (
    <motion.section
      className="text-center py-32 px-4 bg-gradient-to-b from-gray-900 to-black text-white"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">
        AI-Powered Video Clips in Seconds
      </h1>
      <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
        Turn long videos into short, punchy clips your audience will love.
        Perfect for creators, coaches, and educators.
      </p>
      <Link to="/app">
        <button className="text-lg bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-2xl shadow-lg">
          Try ClipGenius Now
        </button>
      </Link>
    </motion.section>
  );
}
