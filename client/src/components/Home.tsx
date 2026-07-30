import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import SkribbleText from './SkribbleText.tsx';
import { SKIN_COLORS, EYE_STYLES, MOUTH_STYLES, HAT_STYLES, PEEKING_AVATARS } from './Instrument.tsx';

// Helper to generate a random index
function getRandomIndex<T>(arr: T[]): number {
  return Math.floor(Math.random() * arr.length);
}

const Home = () => {
  const navigate = useNavigate();

  // State for input settings
  const [nickname, setNickname] = useState('');

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

  return (
    <div className="min-h-screen bg-paper-grid text-[#1e1b4b] flex flex-col items-center justify-between font-patrick relative pb-8">
      {/* Header section with bouncing handwritten logo */}
      <header className="mt-6 mb-2 z-10 text-center select-none flex flex-col items-center">
        <SkribbleText textSize={5} />
        <div className="inline-block mt-2 font-kalam text-lg font-bold text-indigo-900 highlighter-yellow -rotate-1 shadow-sm px-3 py-1">
          ✏️ The Hand-Drawn Skribbl & Guessing Game!
        </div>
      </header>

      {/* Main Container Card Area */}
      <main className="w-full flex-1 flex flex-col items-center justify-center gap-10 px-4 max-w-6xl">
        <div className="w-full flex justify-center">
          {/* Peeking Avatars & Main Card wrapper */}
          <div className="relative w-full max-w-md mt-6">
            {/* Masking tape stickers holding down the main card */}
            <div className="tape-sticker tape-top-left" />
            <div className="tape-sticker tape-top-right" />

            {/* Peeking characters behind the card */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-7 flex justify-center items-end h-8 overflow-visible z-0 pointer-events-none select-none">
              {PEEKING_AVATARS.map((item, idx) => (
                <div
                  key={idx}
                  className={`w-9 h-9 rounded-t-full border-t-2 border-x-2 border-[#1e1b4b] shadow-inner transition-transform duration-300 hover:-translate-y-2 flex items-center justify-center ${item.rot} ${item.offset}`}
                  style={{ backgroundColor: item.bg }}>
                  <svg
                    viewBox="0 0 120 120"
                    className="w-8 h-8">
                    {EYE_STYLES[item.eyes].element}
                    {MOUTH_STYLES[item.mouth].element}
                  </svg>
                </div>
              ))}
            </div>

            {/* Central sketch pad panel */}
            <div className="bg-[#fffdf7] border-sketch-lg shadow-sketch-lg p-6 rounded-2xl flex flex-col gap-5 relative z-10">
              {/* Card Title Banner */}
              <div className="text-center font-caveat font-extrabold text-3xl text-indigo-950 border-b-2 border-dashed border-indigo-900/30 pb-2">
                🎨 Sketch Your Avatar & Join!
              </div>

              {/* Nickname Input */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-kalam font-bold text-indigo-950 uppercase tracking-wider">Player Name:</label>
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="Enter your nickname..."
                  className="bg-[#fcf9f2] border-sketch px-4 py-3 text-indigo-950 font-kalam font-bold text-xl placeholder-indigo-900/40 shadow-sketch-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all text-center rounded-xl"
                />
              </div>

              {/* Avatar customization box */}
              <div className="bg-[#f6eedb] border-sketch rounded-xl p-4 flex items-center justify-between h-48 relative shadow-inner group">
                {/* Randomizer dice in top right corner */}
                <button
                  onClick={randomizeAvatar}
                  title="Randomize Avatar"
                  className="btn-sketch absolute top-2.5 right-2.5 bg-amber-200 hover:bg-amber-300 text-indigo-950 p-2 rounded-lg cursor-pointer active:scale-95 z-20 shadow-sketch-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 transition-transform duration-300 hover:rotate-45"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}>
                    <rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      rx="2"
                      ry="2"
                    />
                    <circle
                      cx="8.5"
                      cy="8.5"
                      r="1.5"
                      fill="currentColor"
                    />
                    <circle
                      cx="15.5"
                      cy="8.5"
                      r="1.5"
                      fill="currentColor"
                    />
                    <circle
                      cx="15.5"
                      cy="15.5"
                      r="1.5"
                      fill="currentColor"
                    />
                    <circle
                      cx="8.5"
                      cy="15.5"
                      r="1.5"
                      fill="currentColor"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="1.5"
                      fill="currentColor"
                    />
                  </svg>
                </button>

                {/* Left arrow column */}
                <div className="flex flex-col gap-2.5 z-10">
                  <button
                    onClick={() => setEyeIndex((prev) => (prev - 1 + EYE_STYLES.length) % EYE_STYLES.length)}
                    className="btn-sketch bg-white hover:bg-yellow-100 text-indigo-950 w-9 h-8 flex items-center justify-center font-bold text-lg"
                    title="Change Eyes">
                    &lt;
                  </button>
                  <button
                    onClick={() => setMouthIndex((prev) => (prev - 1 + MOUTH_STYLES.length) % MOUTH_STYLES.length)}
                    className="btn-sketch bg-white hover:bg-yellow-100 text-indigo-950 w-9 h-8 flex items-center justify-center font-bold text-lg"
                    title="Change Mouth">
                    &lt;
                  </button>
                  <button
                    onClick={() => setHatIndex((prev) => (prev - 1 + HAT_STYLES.length) % HAT_STYLES.length)}
                    className="btn-sketch bg-white hover:bg-yellow-100 text-indigo-950 w-9 h-8 flex items-center justify-center font-bold text-lg"
                    title="Change Hat">
                    &lt;
                  </button>
                </div>

                {/* Center Avatar Preview Container */}
                <div className="flex-1 flex justify-center items-center h-full relative">
                  <svg
                    viewBox="0 0 120 120"
                    className="w-32 h-32 drop-shadow-[4px_6px_0px_rgba(30,27,75,0.2)]">
                    <ellipse
                      cx="60"
                      cy="67"
                      rx="34"
                      ry="31"
                      fill="rgba(0,0,0,0.12)"
                    />
                    <ellipse
                      cx="60"
                      cy="65"
                      rx="33"
                      ry="30"
                      fill={SKIN_COLORS[skinIndex]}
                      stroke="#1e1b4b"
                      strokeWidth="4.5"
                    />
                    {HAT_STYLES[hatIndex].element}
                    {EYE_STYLES[eyeIndex].element}
                    {MOUTH_STYLES[mouthIndex].element}
                  </svg>
                </div>

                {/* Right arrow column */}
                <div className="flex flex-col gap-2.5 z-10">
                  <button
                    onClick={() => setEyeIndex((prev) => (prev + 1) % EYE_STYLES.length)}
                    className="btn-sketch bg-white hover:bg-yellow-100 text-indigo-950 w-9 h-8 flex items-center justify-center font-bold text-lg"
                    title="Change Eyes">
                    &gt;
                  </button>
                  <button
                    onClick={() => setMouthIndex((prev) => (prev + 1) % MOUTH_STYLES.length)}
                    className="btn-sketch bg-white hover:bg-yellow-100 text-indigo-950 w-9 h-8 flex items-center justify-center font-bold text-lg"
                    title="Change Mouth">
                    &gt;
                  </button>
                  <button
                    onClick={() => setHatIndex((prev) => (prev + 1) % HAT_STYLES.length)}
                    className="btn-sketch bg-white hover:bg-yellow-100 text-indigo-950 w-9 h-8 flex items-center justify-center font-bold text-lg"
                    title="Change Hat">
                    &gt;
                  </button>
                </div>

                {/* Skin color change controls at bottom center */}
                <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 flex items-center gap-2">
                  <button
                    onClick={() => setSkinIndex((prev) => (prev - 1 + SKIN_COLORS.length) % SKIN_COLORS.length)}
                    className="btn-sketch bg-white hover:bg-yellow-100 text-indigo-950 px-2 py-0.5 text-xs font-bold"
                    title="Previous Color">
                    &lt;
                  </button>
                  <span className="text-xs font-kalam font-extrabold text-indigo-950 uppercase tracking-wide highlighter-yellow px-1">
                    Skin Color
                  </span>
                  <button
                    onClick={() => setSkinIndex((prev) => (prev + 1) % SKIN_COLORS.length)}
                    className="btn-sketch bg-white hover:bg-yellow-100 text-indigo-950 px-2 py-0.5 text-xs font-bold"
                    title="Next Color">
                    &gt;
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3.5 mt-2">
                <button
                  onClick={() => {
                    localStorage.setItem('nickname', nickname);
                    navigate('/draw');
                  }}
                  className="btn-sketch bg-emerald-400 hover:bg-emerald-300 text-indigo-950 font-kalam font-extrabold text-2xl py-3.5 shadow-sketch-green uppercase tracking-wider flex justify-center items-center gap-2">
                  <span>✏️</span> PLAY NOW!
                </button>

                <button
                  onClick={() => console.log('Create private room triggered')}
                  className="btn-sketch bg-indigo-500 hover:bg-indigo-400 text-white font-kalam font-bold text-xl py-2.5 shadow-sketch-indigo tracking-wide">
                  🔒 Create Private Room
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Info Grid (About, News, How to Play) styled like Sticky Notes & Notebook Sheets */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          {/* About Section - Yellow Sticky Note */}
          <div className="sticky-note-yellow p-5 flex flex-col gap-3 shadow-sketch-lg -rotate-1 relative">
            <div
              className="tape-sticker tape-top-left"
              style={{ width: '70px', height: '20px' }}
            />
            <div className="flex items-center gap-2 border-b-2 border-dashed border-indigo-950/30 pb-2">
              <span className="text-2xl">📌</span>
              <h2 className="font-caveat text-3xl font-extrabold text-indigo-950">About Ink & Think</h2>
            </div>
            <div className="text-indigo-950 font-patrick text-lg leading-relaxed flex flex-col gap-2">
              <p>
                <strong className="highlighter-pink">Ink & Think</strong> is a fun online multiplayer drawing and guessing game!
              </p>
              <p>Each round, one player draws a chosen word while everyone else scribbles their guesses to score points.</p>
              <p className="font-bold font-kalam text-indigo-900 mt-1">🏆 Highest score at the end wins! Have fun doodling!</p>
            </div>
          </div>

          {/* News Section - Lined Notebook Sheet */}
          <div className="bg-ruled-paper border-sketch p-5 flex flex-col gap-3 shadow-sketch-lg rotate-1 relative">
            <div
              className="tape-sticker tape-top-right"
              style={{ width: '70px', height: '20px' }}
            />
            <div className="flex items-center gap-2 border-b-2 border-indigo-950/30 pb-2">
              <span className="text-2xl">📰</span>
              <h2 className="font-caveat text-3xl font-extrabold text-indigo-950">Fresh Paint News</h2>
            </div>
            <div className="custom-scrollbar overflow-y-auto max-h-60 pr-2 text-indigo-950 font-patrick text-base flex flex-col gap-4">
              <div>
                <div className="flex justify-between items-baseline mb-1 border-b border-indigo-900/20 pb-1 font-kalam font-bold text-sm">
                  <span className="highlighter-yellow text-indigo-950">Hand-Drawn Edition Upgrade</span>
                  <span className="text-xs text-indigo-800/70">Jul 2026</span>
                </div>
                <ul className="list-disc pl-5 space-y-1 text-indigo-950">
                  <li>Handwritten Google fonts (`Caveat`, `Kalam`, `Patrick Hand`)</li>
                  <li>Wobbly paper cards, masking tape stickers, & sketch shadows</li>
                  <li>Smooth canvas tools and avatar customizer</li>
                </ul>
              </div>

              <div>
                <div className="flex justify-between items-baseline mb-1 border-b border-indigo-900/20 pb-1 font-kalam font-bold text-sm">
                  <span className="highlighter-green text-indigo-950">Gameplay Enhancements</span>
                  <span className="text-xs text-indigo-800/70">Jun 2026</span>
                </div>
                <ul className="list-disc pl-5 space-y-1 text-indigo-950">
                  <li>Real-time socket chat with hand-drawn bubbles</li>
                  <li>Custom word pack options for room hosts</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Interactive How to Play Section - Pink Sticky Note */}
          <div className="sticky-note-pink p-5 flex flex-col justify-between gap-3 shadow-sketch-lg rotate-[-0.5deg] relative">
            <div
              className="tape-sticker tape-top-left"
              style={{ width: '70px', height: '20px' }}
            />
            <div className="flex items-center gap-2 border-b-2 border-dashed border-indigo-950/30 pb-2">
              <span className="text-2xl">💡</span>
              <h2 className="font-caveat text-3xl font-extrabold text-indigo-950">How to Play</h2>
            </div>

            {/* Carousel Content */}
            <div className="flex-1 flex flex-col justify-center items-center text-center py-2 h-44">
              {carouselStep === 0 && (
                <div className="flex flex-col items-center gap-2 animate-fadeIn">
                  <span className="font-kalam text-xs uppercase font-extrabold highlighter-yellow text-indigo-950 px-2 py-0.5">Step 1</span>
                  <div className="font-caveat text-2xl font-black text-indigo-950">1. Choose a Secret Word!</div>
                  <div className="flex gap-2 my-1">
                    <span className="btn-sketch bg-white px-2.5 py-1 text-xs opacity-60">Apple</span>
                    <span className="btn-sketch bg-yellow-200 px-2.5 py-1 text-xs text-rose-700">House ✏️</span>
                    <span className="btn-sketch bg-white px-2.5 py-1 text-xs opacity-60">Water</span>
                  </div>
                  <p className="text-indigo-950 text-base leading-snug max-w-xs">When it's your turn, pick 1 of 3 secret words to sketch!</p>
                </div>
              )}

              {carouselStep === 1 && (
                <div className="flex flex-col items-center gap-2 animate-fadeIn">
                  <span className="font-kalam text-xs uppercase font-extrabold highlighter-yellow text-indigo-950 px-2 py-0.5">Step 2</span>
                  <div className="font-caveat text-2xl font-black text-indigo-950">2. Draw the Word!</div>
                  <div className="w-20 h-14 bg-white border-sketch-sm rounded-lg flex items-center justify-center my-1">
                    <svg
                      viewBox="0 0 100 100"
                      className="w-10 h-10 text-indigo-900 stroke-current"
                      fill="none"
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeLinejoin="round">
                      <path d="M 20,80 L 20,50 L 50,20 L 80,50 L 80,80 Z" />
                      <path d="M 40,80 L 40,60 L 60,60 L 60,80" />
                    </svg>
                  </div>
                  <p className="text-indigo-950 text-base leading-snug max-w-xs">Draw your chosen word. No letters or numbers allowed!</p>
                </div>
              )}

              {carouselStep === 2 && (
                <div className="flex flex-col items-center gap-2 animate-fadeIn">
                  <span className="font-kalam text-xs uppercase font-extrabold highlighter-yellow text-indigo-950 px-2 py-0.5">Step 3</span>
                  <div className="font-caveat text-2xl font-black text-indigo-950">3. Guess Fast!</div>
                  <div className="flex flex-col gap-1 w-36 bg-white border-sketch-sm p-1.5 rounded-lg font-kalam text-xs text-left">
                    <div className="text-rose-600">User2: home?</div>
                    <div className="text-emerald-700 font-bold bg-emerald-100 px-1 rounded">User1 guessed it! 🎉</div>
                  </div>
                  <p className="text-indigo-950 text-base leading-snug max-w-xs">
                    Type your guesses into the chat box! Faster guesses score more points.
                  </p>
                </div>
              )}
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center items-center gap-2 pt-1">
              {[0, 1, 2].map((idx) => (
                <button
                  key={idx}
                  onClick={() => setCarouselStep(idx)}
                  className={`w-4 h-4 rounded-full border-2 border-[#1e1b4b] cursor-pointer transition-all duration-200 ${
                    carouselStep === idx ? 'bg-indigo-900 scale-110 shadow-sm' : 'bg-white hover:bg-yellow-200'
                  }`}
                  title={`Go to step ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full mt-10 text-center font-kalam text-sm text-indigo-950/70 border-t-2 border-dashed border-indigo-950/20 pt-4">
        <div className="flex flex-wrap justify-center gap-4 font-bold text-indigo-900">
          <a
            href="#contact"
            className="hover:underline">
            Contact
          </a>
          <span>•</span>
          <a
            href="#tos"
            className="hover:underline">
            Terms of Service
          </a>
          <span>•</span>
          <a
            href="#credits"
            className="hover:underline">
            Credits
          </a>
          <span>•</span>
          <a
            href="#privacy"
            className="hover:underline">
            Privacy Settings
          </a>
        </div>
        <p className="text-xs text-indigo-900/60 mt-1 max-w-md mx-auto">Ink & Think — Hand-crafted with ✏️ ink, paper, and code.</p>
      </footer>
    </div>
  );
};

export default Home;
