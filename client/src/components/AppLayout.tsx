import { Link, Outlet } from "react-router";
import SkribbleText from "./SkribbleText.jsx";

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-grid-pattern-layout text-white flex flex-col font-sans bg-gray-900">
      {/* Premium Glassmorphic Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#1b1538]/80 border-b border-purple-500/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/">
            <SkribbleText textSize={2} />
          </Link>


          {/* Exit Room / Home Button */}
          <div>
            <Link
              to="/"
              className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-extrabold uppercase border border-red-500/30 text-red-400 hover:text-white hover:bg-red-500 hover:border-red-500 hover:shadow-[0_0_15px_rgba(239,68,68,0.35)] transition-all duration-300 flex items-center gap-1.5"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span className="hidden xs:inline">Leave</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Nested Content Outlet */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-center">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
