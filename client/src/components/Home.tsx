import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import SkribbleText from "./SkribbleText.tsx";
import {
  SKIN_COLORS,
  EYE_STYLES,
  MOUTH_STYLES,
  HAT_STYLES,
  PEEKING_AVATARS,
} from "./Instrument.tsx";



// Helper to generate a random index
function getRandomIndex<T>(arr: T[]): number {
  return Math.floor(Math.random() * arr.length);
}
// const getRandomIndex = (arr) => Math.floor(Math.random() * arr.length);

const Home = () => {
  const navigate = useNavigate();
  // State for input settings
  const [nickname, setNickname] = useState("");

  // Avatar Builder Indices
  const [skinIndex, setSkinIndex] = useState(0);
  const [eyeIndex, setEyeIndex] = useState(0);
  const [mouthIndex, setMouthIndex] = useState(0);
  const [hatIndex, setHatIndex] = useState(0);

  // How to Play Carousel Slide
  const [carouselStep, setCarouselStep] = useState(0);

  // Randomize Avatar
  const randomizeAvatar = () => {
    setSkinIndex(getRandomIndex(SKIN_COLORS));
    setEyeIndex(getRandomIndex(EYE_STYLES));
    setMouthIndex(getRandomIndex(MOUTH_STYLES));
    setHatIndex(getRandomIndex(HAT_STYLES));
  };

  // Set initial random state once
  useEffect(() => {
    randomizeAvatar();
  }, []);

  // Custom inline styles for grid background and scrollbars
  const customStyles = `
    .bg-grid-pattern {
      background-color: #120e24;
      background-image: 
        radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.18) 0%, transparent 65%),
        radial-gradient(rgba(255, 255, 255, 0.035) 1.5px, transparent 1.5px);
      background-size: 100% 100%, 28px 28px;
    }
    .custom-scrollbar::-webkit-scrollbar {
      width: 8px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.03);
      border-radius: 6px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.15);
      border-radius: 6px;
      border: 2px solid #120e24;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: rgba(255, 255, 255, 0.3);
    }
  `;



  return (
    <div className="bg-white flex flex-col items-center  ">
      <style>{customStyles}</style>

      {/* Header section with bouncing letters */}
      <header className="mt-4 mb-2 z-10 text-center select-none">
        <SkribbleText textSize={5} />
        <p className="text-xs uppercase tracking-widest text-purple-400/60 mt-1 font-semibold">
          Premium Violet Edition
        </p>
      </header>

      {/* Main Container Card Area */}
      <main className="w-full flex-1 flex flex-col items-center justify-center gap-8">
        <div className="w-full flex flex-wrap justify-center gap-4 border-4 border-red-400 p-4 md:p-8">
        
          {/* Peeking Avatars & Main Box container wrapper */}
          <div className="relative w-full max-w-112.5 mt-6">
            {/* Peeking characters behind the card */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-7 flex justify-center items-end h-8 overflow-visible z-0 pointer-events-none select-none">
              {PEEKING_AVATARS.map((item, idx) => (
                <div
                  key={idx}
                  className={`w-9 h-9 rounded-t-full border-t-2 border-x-2 border-[#1e1b4b] shadow-inner transition-transform duration-300 hover:-translate-y-2 flex items-center justify-center ${item.rot} ${item.offset}`}
                  style={{ backgroundColor: item.bg }}
                >
                  <svg viewBox="0 0 120 120" className="w-8 h-8">
                    {/* Render eyes */}
                    {EYE_STYLES[item.eyes].element}
                    {/* Render mouth */}
                    {MOUTH_STYLES[item.mouth].element}
                  </svg>
                </div>
              ))}
            </div>

            {/* Central card panel */}
            <div className="bg-[#1b1538]/95 backdrop-blur-md border border-purple-500/20 shadow-2xl rounded-xl p-6 flex flex-col gap-4 relative z-10">
              {/* Input Inputs (Name / Language) */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="Enter Nickname"
                  className="flex-1 min-w-0 bg-[#120e24] border border-purple-500/30 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all font-bold text-center placeholder-purple-300/30 text-lg shadow-inner"
                />
              </div>

              {/* Avatar customization box */}
              <div className="bg-[#120e24]/80 border border-purple-500/20 rounded-xl p-4 flex items-center justify-between h-44 relative shadow-inner group">
                {/* Randomizer dice in top right corner */}
                <button
                  onClick={randomizeAvatar}
                  title="Randomize Avatar"
                  className="absolute top-2.5 right-2.5 text-purple-400/60 hover:text-purple-300 transition-colors p-1.5 hover:bg-purple-500/10 rounded-lg cursor-pointer active:scale-95 z-20"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 transition-transform duration-300 hover:rotate-45"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
                    <circle cx="15.5" cy="8.5" r="1.5" fill="currentColor" />
                    <circle cx="15.5" cy="15.5" r="1.5" fill="currentColor" />
                    <circle cx="8.5" cy="15.5" r="1.5" fill="currentColor" />
                    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                  </svg>
                </button>

                {/* Left arrow column */}
                <div className="flex flex-col gap-3 z-10">
                  {/* Eyes arrow */}
                  <button
                    onClick={() =>
                      setEyeIndex(
                        (prev) =>
                          (prev - 1 + EYE_STYLES.length) % EYE_STYLES.length,
                      )
                    }
                    className="w-10 h-8 flex items-center justify-center bg-purple-500/10 hover:bg-purple-500/25 active:scale-90 text-purple-300 border border-purple-500/20 rounded-lg font-mono font-bold transition-all cursor-pointer"
                    title="Change Eyes"
                  >
                    &lt;
                  </button>
                  {/* Mouth arrow */}
                  <button
                    onClick={() =>
                      setMouthIndex(
                        (prev) =>
                          (prev - 1 + MOUTH_STYLES.length) %
                          MOUTH_STYLES.length,
                      )
                    }
                    className="w-10 h-8 flex items-center justify-center bg-purple-500/10 hover:bg-purple-500/25 active:scale-90 text-purple-300 border border-purple-500/20 rounded-lg font-mono font-bold transition-all cursor-pointer"
                    title="Change Mouth"
                  >
                    &lt;
                  </button>
                  {/* Hat arrow */}
                  <button
                    onClick={() =>
                      setHatIndex(
                        (prev) =>
                          (prev - 1 + HAT_STYLES.length) % HAT_STYLES.length,
                      )
                    }
                    className="w-10 h-8 flex items-center justify-center bg-purple-500/10 hover:bg-purple-500/25 active:scale-90 text-purple-300 border border-purple-500/20 rounded-lg font-mono font-bold transition-all cursor-pointer"
                    title="Change Hat"
                  >
                    &lt;
                  </button>
                </div>

                {/* Center Avatar Preview Container */}
                <div className="flex-1 flex justify-center items-center h-full relative">
                  <svg
                    viewBox="0 0 120 120"
                    className="w-28 h-28 drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)]"
                  >
                    {/* Body background shadow */}
                    <ellipse
                      cx="60"
                      cy="67"
                      rx="34"
                      ry="31"
                      fill="rgba(0,0,0,0.15)"
                    />

                    {/* Base Body Blob */}
                    <ellipse
                      cx="60"
                      cy="65"
                      rx="33"
                      ry="30"
                      fill={SKIN_COLORS[skinIndex]}
                      stroke="#1e1b4b"
                      strokeWidth="4.5"
                    />

                    {/* Render Hat (If any, render before eyes or overlay depending on hat style) */}
                    {HAT_STYLES[hatIndex].element}

                    {/* Render Eyes */}
                    {EYE_STYLES[eyeIndex].element}

                    {/* Render Mouth */}
                    {MOUTH_STYLES[mouthIndex].element}
                  </svg>
                </div>

                {/* Right arrow column */}
                <div className="flex flex-col gap-3 z-10">
                  {/* Eyes arrow */}
                  <button
                    onClick={() =>
                      setEyeIndex((prev) => (prev + 1) % EYE_STYLES.length)
                    }
                    className="w-10 h-8 flex items-center justify-center bg-purple-500/10 hover:bg-purple-500/25 active:scale-90 text-purple-300 border border-purple-500/20 rounded-lg font-mono font-bold transition-all cursor-pointer"
                    title="Change Eyes"
                  >
                    &gt;
                  </button>
                  {/* Mouth arrow */}
                  <button
                    onClick={() =>
                      setMouthIndex((prev) => (prev + 1) % MOUTH_STYLES.length)
                    }
                    className="w-10 h-8 flex items-center justify-center bg-purple-500/10 hover:bg-purple-500/25 active:scale-90 text-purple-300 border border-purple-500/20 rounded-lg font-mono font-bold transition-all cursor-pointer"
                    title="Change Mouth"
                  >
                    &gt;
                  </button>
                  {/* Hat arrow */}
                  <button
                    onClick={() =>
                      setHatIndex((prev) => (prev + 1) % HAT_STYLES.length)
                    }
                    className="w-10 h-8 flex items-center justify-center bg-purple-500/10 hover:bg-purple-500/25 active:scale-90 text-purple-300 border border-purple-500/20 rounded-lg font-mono font-bold transition-all cursor-pointer"
                    title="Change Hat"
                  >
                    &gt;
                  </button>
                </div>

                {/* Skin color change buttons overlay at bottom center */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2.5">
                  <button
                    onClick={() =>
                      setSkinIndex(
                        (prev) =>
                          (prev - 1 + SKIN_COLORS.length) % SKIN_COLORS.length,
                      )
                    }
                    className="w-6 h-5 flex items-center justify-center text-xs bg-purple-500/10 hover:bg-purple-500/25 text-purple-300 rounded border border-purple-500/20 active:scale-90 cursor-pointer transition-all"
                    title="Previous Color"
                  >
                    &lt;
                  </button>
                  <span className="text-[10px] font-bold text-purple-400/70 tracking-wider uppercase">
                    Color
                  </span>
                  <button
                    onClick={() =>
                      setSkinIndex((prev) => (prev + 1) % SKIN_COLORS.length)
                    }
                    className="w-6 h-5 flex items-center justify-center text-xs bg-purple-500/10 hover:bg-purple-500/25 text-purple-300 rounded border border-purple-500/20 active:scale-90 cursor-pointer transition-all"
                    title="Next Color"
                  >
                    &gt;
                  </button>
                </div>
              </div>

              {/* Play and Room Creation Buttons */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => {
                    console.log("Play triggered", {
                      nickname,
                    //   language,
                      avatar: { skinIndex, eyeIndex, mouthIndex, hatIndex },
                    });
                    localStorage.setItem("nickname", nickname);
                    navigate("/draw");
                  }}
                  className="w-full py-3.5 bg-green-500 hover:bg-green-400 active:scale-[0.98] text-white font-black text-2xl rounded-xl shadow-lg shadow-green-500/25 border-b-4 border-green-700 hover:border-green-600 transition-all tracking-wide uppercase cursor-pointer flex justify-center items-center gap-2"
                >
                  Play!
                </button>

                <button
                  onClick={() => console.log("Create private room triggered")}
                  className="w-full py-3 bg-indigo-500 hover:bg-indigo-400 active:scale-[0.98] text-white font-bold text-lg rounded-xl shadow-md border-b-4 border-indigo-700 hover:border-indigo-600 transition-all tracking-wide cursor-pointer text-center"
                >
                  Create Private Room
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Info Grid (About, News, How to Play) */}
        <div className="w-full bg-gray-900 flex justify-center">
          <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6 mt-4 py-8">
            {/* About Section */}
            <div className="bg-[#1b1538]/85 p-5 flex flex-col gap-4 shadow-lg hover:border-purple-500/25 transition-all">
              <div className="flex items-center gap-2.5 border-b border-purple-500/10 pb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-indigo-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4" />
                  <path d="M12 8h.01" />
                </svg>
                <h2 className="text-xl font-bold tracking-wide text-white ">
                  About
                </h2>
              </div>
              <div className="text-slate-300 text-sm leading-relaxed flex flex-col gap-3">
                <p>
                  <strong className="text-purple-400 font-semibold">
                    skribbl.io
                  </strong>{" "}
                  is a free online multiplayer drawing and guessing pictionary
                  game.
                </p>
                <p>
                  A normal game consists of a few rounds, where every round a
                  player has to draw their chosen word and others have to guess
                  it to gain points!
                </p>
                <p>
                  The person with the most points at the end of the game will
                  then be crowned as the winner! Have fun!
                </p>
              </div>
            </div>

            {/* News Section */}
            <div className="bg-[#1b1538]/85 p-5 flex flex-col gap-4 shadow-lg hover:border-purple-500/25 transition-all">
              <div className="flex items-center gap-2.5 border-b border-purple-500/10 pb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-purple-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
                <h2 className="text-xl font-bold tracking-wide text-white">
                  News
                </h2>
              </div>
              <div className="custom-scrollbar overflow-y-auto max-h-56 pr-2 text-slate-300 text-sm leading-relaxed flex flex-col gap-4">
                <div>
                  <div className="flex justify-between items-baseline mb-1 border-b border-purple-500/10 pb-1">
                    <span className="font-bold text-purple-300 text-sm uppercase tracking-wider">
                      Fresh Paint
                    </span>
                    <span className="text-[10px] text-purple-400/60 font-semibold">
                      9th November 2022
                    </span>
                  </div>
                  <p className="mb-2 text-slate-200 font-medium">
                    Hello artists!
                  </p>
                  <ul className="list-disc pl-4 space-y-1.5 text-sm text-slate-300">
                    <li>Redesign of the entire dashboard landing page</li>
                    <li>
                      Responsive layout support for tablets and mobile screens
                    </li>
                    <li>
                      <strong>Reworked Toolbar:</strong> Includes undo button,
                      custom color selectors, click shortcut bindings, touch
                      pressure support, and hotkeys.
                    </li>
                    <li>
                      <strong>Moderation:</strong> Room owners can kick or ban
                      users. Added votekick triggers, mute system, and
                      reporting.
                    </li>
                    <li>
                      Invite friends to public rooms with direct shareable URLs.
                    </li>
                    <li>
                      <strong>Room Settings:</strong> Custom lobby player cap
                      increased to 20, customizable word list lengths.
                    </li>
                  </ul>
                </div>
                <div>
                  <div className="flex justify-between items-baseline mb-1 border-b border-purple-500/10 pb-1">
                    <span className="font-bold text-purple-300 text-sm uppercase tracking-wider">
                      Bug Fixes
                    </span>
                    <span className="text-[10px] text-purple-400/60 font-semibold">
                      24th September 2022
                    </span>
                  </div>
                  <ul className="list-disc pl-4 space-y-1.5 text-sm text-slate-300">
                    <li>
                      Fixed issue where pressing Enter key wouldn't send message
                      data in lobby chat
                    </li>
                    <li>
                      Resolved websocket reconnect timeouts on bad connections
                    </li>
                    <li>
                      Optimized rendering for laggy brush strokes on Chrome
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Interactive How to Play Section */}
            <div className="bg-[#1b1538]/85 p-5 flex flex-col justify-between gap-4 shadow-lg hover:border-purple-500/25 transition-all">
              <div className="flex items-center gap-2.5 border-b border-purple-500/10 pb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-rose-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
                <h2 className="text-xl font-bold tracking-wide text-white">
                  How to play
                </h2>
              </div>

              {/* Carousel Content */}
              <div className="flex-1 flex flex-col justify-center items-center text-center py-2 h-44">
                {carouselStep === 0 && (
                  <div className="flex flex-col items-center gap-2 animate-fadeIn">
                    <span className="text-sm uppercase font-extrabold tracking-wider bg-rose-500/10 text-rose-400 px-2.5 py-0.5 rounded-full border border-rose-500/20">
                      Step 1
                    </span>
                    <div className="font-mono text-xl font-black tracking-wide text-rose-300 mt-1 select-none">
                      CHOOSE A WORD!
                    </div>
                    <div className="flex gap-2.5 my-2">
                      <span className="px-3 py-1.5 bg-[#120e24] border border-purple-500/25 text-xs rounded-lg font-bold opacity-60">
                        Apple
                      </span>
                      <span className="px-3 py-1.5 bg-[#120e24] border border-purple-500/40 text-xs rounded-lg font-bold text-rose-400 shadow-[0_0_8px_rgba(244,63,94,0.3)]">
                        House
                      </span>
                      <span className="px-3 py-1.5 bg-[#120e24] border border-purple-500/25 text-xs rounded-lg font-bold opacity-60">
                        Water
                      </span>
                    </div>
                    <p className="text-slate-300 text-sm max-w-xs mt-1 leading-relaxed">
                      When it's your turn, choose one of the three random secret
                      words to draw!
                    </p>
                  </div>
                )}

                {carouselStep === 1 && (
                  <div className="flex flex-col items-center gap-2 animate-fadeIn">
                    <span className="text-xs uppercase font-extrabold tracking-wider bg-indigo-500/10 text-indigo-400 px-2.5 py-0.5 rounded-full border border-indigo-500/20">
                      Step 2
                    </span>
                    <div className="font-mono text-xl font-black tracking-wide text-indigo-300 mt-1 select-none">
                      DRAW THE WORD!
                    </div>
                    <div className="w-20 h-16 bg-[#120e24] border border-purple-500/20 rounded-lg flex items-center justify-center my-1 relative shadow-inner">
                      <svg
                        viewBox="0 0 100 100"
                        className="w-12 h-12 text-indigo-400 stroke-current"
                        fill="none"
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {/* Drawing of a cute house */}
                        <path d="M 20,80 L 20,50 L 50,20 L 80,50 L 80,80 Z" />
                        <path d="M 40,80 L 40,60 L 60,60 L 60,80" />
                      </svg>
                    </div>
                    <p className="text-slate-300 text-xs max-w-xs leading-relaxed">
                      Draw your chosen word to the other players. Don't write
                      letters or words!
                    </p>
                  </div>
                )}

                {carouselStep === 2 && (
                  <div className="flex flex-col items-center gap-2 animate-fadeIn">
                    <span className="text-xs uppercase font-extrabold tracking-wider bg-green-500/10 text-green-400 px-2.5 py-0.5 rounded-full border border-green-500/20">
                      Step 3
                    </span>
                    <div className="font-mono text-xl font-black tracking-wide text-green-300 mt-1 select-none">
                      GUESS IT FAST!
                    </div>
                    <div className="flex flex-col gap-1 w-32 bg-[#120e24]/85 border border-purple-500/25 p-2 rounded-lg my-1.5 font-mono text-[9px] shadow-inner text-left">
                      <div className="text-red-400">User2: home?</div>
                      <div className="text-red-400">User3: apple?</div>
                      <div className="text-green-400 font-bold bg-green-500/10 px-1 rounded animate-pulse">
                        User1 guessed the word!
                      </div>
                    </div>
                    <p className="text-slate-300 text-xs max-w-xs leading-relaxed">
                      Try to guess what other players are drawing! Speed is key
                      for high scores!
                    </p>
                  </div>
                )}
              </div>

              {/* Navigation Dots */}
              <div className="flex justify-center items-center gap-2.5 pt-2">
                {[0, 1, 2].map((idx) => (
                  <button
                    key={idx}
                    onClick={() => setCarouselStep(idx)}
                    className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
                      carouselStep === idx
                        ? "bg-purple-400 scale-125 shadow-[0_0_8px_rgba(168,85,247,0.6)]"
                        : "bg-purple-800 hover:bg-purple-600"
                    }`}
                    title={`Go to step ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer copyright and disclaimer links */}
      <footer className="w-full bg-gray-900 p-4 md:p-2">
        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1 text-xs text-purple-400/80 font-bold">
          <a
            href="#contact"
            className="hover:text-purple-300 hover:underline transition-colors"
          >
            Contact
          </a>
          <span className="text-purple-700/60">•</span>
          <a
            href="#tos"
            className="hover:text-purple-300 hover:underline transition-colors"
          >
            Terms of Service
          </a>
          <span className="text-purple-700/60">•</span>
          <a
            href="#credits"
            className="hover:text-purple-300 hover:underline transition-colors"
          >
            Credits
          </a>
          <span className="text-purple-700/60">•</span>
          <a
            href="#privacy"
            className="hover:text-purple-300 hover:underline transition-colors"
          >
            Privacy Settings
          </a>
        </div>
        <p className="text-[10px] text-purple-400/50 max-w-lg mx-auto leading-relaxed">
          The owner of this site is not responsible for any user generated
          content (drawings, messages, usernames) created during gameplay.
        </p>
      </footer>
    </div>
  );
};

export default Home;
