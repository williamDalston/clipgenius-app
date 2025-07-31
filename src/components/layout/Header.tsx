import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="w-full py-4 px-6 flex justify-between items-center bg-gray-950 text-white shadow-md">
      <Link to="/" className="text-2xl font-bold tracking-tight">ClipGenius</Link>
      <div>
        <SignedOut>
          <SignInButton>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
}
