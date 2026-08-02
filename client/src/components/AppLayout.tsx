import { Link, Outlet } from 'react-router';
import SkribbleText from './SkribbleText';

const AppLayout = () => {
  return (
    <div className="bg-paper-grid text-[#1e1b4b] flex flex-col font-patrick ">
      {/* Hand-Drawn Notebook Header */}
      <header className="sticky top-0 z-50 bg-[#fffdf7] border-b-4 border-[#1e1b4b] shadow-sketch-sm lg:block hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 hover:scale-105 transition-transform">
            <SkribbleText textSize={2} />
          </Link>

          {/* Exit Room / Home Button */}
          <div>
            <Link
              to="/"
              className="btn-sketch bg-rose-500 hover:bg-rose-400 text-white px-4 py-1.5 text-sm font-kalam font-bold tracking-wide flex items-center gap-1.5 shadow-sketch-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span>Leave Room</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Nested Content Outlet */}
      <main className="w-full max-h-screen md:max-h-[90vh] py-2">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
