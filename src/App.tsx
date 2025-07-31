import React from 'react';
import { Routes, Route, Link, NavLink } from 'react-router-dom';
import { Scissors, Upload, Eye, Palette, Download, User, Zap } from 'lucide-react';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

// Import the Zustand store for global state management
import { useAppStore } from './store/useAppStore';

// Import the ProcessingScreen component (used globally for loading states)
import ProcessingScreen from './components/ProcessingScreen';

// Import tab components for the main app interface
import UploadTab from './components/tabs/UploadTab';
import DetectTab from './components/tabs/DetectTab';
import StyleTab from './components/tabs/StyleTab';
import ExportTab from './components/tabs/ExportTab';

// --- Extracted Header Component ---
// This component handles the main application header, including the logo,
// navigation tabs, and user information (like credits). It's designed to be
// present across most pages of the application.
const Header: React.FC = () => {
  // Access the 'credits' state from the Zustand store
  const { credits } = useAppStore();

  return (
      <header className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
          <Logo /> {/* Render the Logo component */}
          <Navigation /> {/* Render the Navigation component */}
          <div className="flex items-center space-x-4">
            <UserInfo credits={credits} /> {/* Render the UserInfo component, passing credits */}
            <SignedOut>
              <SignInButton mode="modal">
                <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton 
                appearance={{
                  elements: {
                    userButtonAvatarBox: 'w-8 h-8',
                    userButtonTrigger: 'focus:shadow-none',
                  }
                }}
              />
            </SignedIn>
          </div>
        </div>
      </div>
    </header>
  );
};

// --- Logo Component ---
// A small, dedicated component to display the application's logo and name.
// It uses a Link from React Router to navigate to the home page ('/').
const Logo: React.FC = () => (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Scissors className="w-5 h-5 text-white" />
                </div>
    <Link to="/" className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ClipGenius
    </Link>
              </div>
);

// --- Navigation Component ---
// This component renders the primary navigation links for the dashboard.
// It uses NavLink from 'react-router-dom' which automatically applies
// an 'active' class based on the current route, allowing for active tab styling.
const Navigation: React.FC = () => (
              <nav className="hidden md:flex space-x-1">
    {/* Each NavLink corresponds to a specific tab/sub-route within the Dashboard */}
    <NavLink
      to="/app/upload"
      className={({ isActive }) =>
        `flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
          isActive
            ? 'bg-blue-600 text-white shadow-lg' // Styles for the active navigation link
            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900' // Styles for inactive links
        }`
      }
    >
      <Upload size={18} />
      <span>Upload</span>
    </NavLink>
    <NavLink
      to="/app/detect"
      className={({ isActive }) =>
        `flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
          isActive
            ? 'bg-blue-600 text-white shadow-lg'
            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
        }`
      }
    >
      <Eye size={18} />
      <span>Detect</span>
    </NavLink>
    <NavLink
      to="/app/style"
      className={({ isActive }) =>
        `flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
          isActive
            ? 'bg-blue-600 text-white shadow-lg'
            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
        }`
      }
    >
      <Palette size={18} />
      <span>Style</span>
    </NavLink>
    <NavLink
      to="/app/export"
      className={({ isActive }) =>
        `flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
          isActive
            ? 'bg-blue-600 text-white shadow-lg'
            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
        }`
      }
    >
      <Download size={18} />
      <span>Export</span>
    </NavLink>
    <div className="border-l border-gray-300 mx-2"></div>
    <Link
      to="/creator"
      className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
    >
      <Zap size={18} />
      <span>Creator Studio</span>
    </Link>
              </nav>
);

// --- UserInfo Component ---
// Displays the user's current credit balance and a profile icon.
const UserInfo: React.FC<{ credits: number }> = ({ credits }) => (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-gradient-to-r from-emerald-50 to-blue-50 px-3 py-1 rounded-full">
                <Zap className="w-4 h-4 text-emerald-600" />
      <span className="text-sm font-medium text-emerald-700">{credits} credits</span>
              </div>
              <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <User size={20} />
              </button>
            </div>
);

// --- Main App Component ---
// This is the root component of your React application.
// It sets up the React Router for navigation and conditionally renders
// a global processing screen based on the application's state.
const App: React.FC = () => {
  // Get the 'processing' state from the Zustand store.
  // This state controls whether the global loading screen is displayed.
  const { processing } = useAppStore();

  // If 'processing' is true, render the ProcessingScreen as a full-page overlay.
  // This prevents any other UI from being interacted with during a global processing event.
  if (processing) {
    return <ProcessingScreen />;
  }

  return (
    // Main container for the application, applying global styles
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 font-sans">
      <Header />

      {/* Main content area for the app tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          {/* Redirect from /app to /app/upload as the default tab */}
          <Route index element={<UploadTab />} />
          <Route path="upload" element={<UploadTab />} />
          <Route path="detect" element={<DetectTab />} />
          <Route path="style" element={<StyleTab />} />
          <Route path="export" element={<ExportTab />} />
          {/* Fallback for any invalid app sub-routes, redirects to upload */}
          <Route path="*" element={<UploadTab />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
