import React from 'react';

interface SkribbleTextProps {
  textSize?: number;
}

const SkribbleText: React.FC<SkribbleTextProps> = ({ textSize = 4 }) => {
  // Map size prop to Tailwind size classes
  const fontSizes: Record<number, string> = {
    1: 'text-2xl md:text-3xl',
    2: 'text-3xl md:text-4xl',
    3: 'text-4xl md:text-5xl',
    4: 'text-5xl md:text-6xl',
    5: 'text-6xl md:text-7xl'
  };

  const letters = [
    { char: 'i', color: 'text-rose-600', rot: '-rotate-6' },
    { char: 'n', color: 'text-amber-600', rot: 'rotate-3' },
    { char: 'k', color: 'text-emerald-600', rot: '-rotate-3' },
    { char: '&', color: 'text-blue-600', rot: 'rotate-6' },
    { char: 't', color: 'text-indigo-600', rot: '-rotate-4' },
    { char: 'h', color: 'text-purple-600', rot: 'rotate-3' },
    { char: 'i', color: 'text-pink-600', rot: '-rotate-2' },
    { char: 'n', color: 'text-teal-600', rot: 'rotate-4' },
    { char: 'k', color: 'text-orange-600', rot: '-rotate-3' }
  ];

  return (
    <div className="flex flex-col items-center justify-center select-none">
      <h1
        className={`font-caveat font-extrabold tracking-wider flex items-center justify-center gap-0.5 ${
          fontSizes[textSize] || 'text-5xl md:text-6xl'
        }`}
        style={{
          filter: 'drop-shadow(3px 3px 0px #1e1b4b)'
        }}>
        {letters.map((item, idx) => (
          <span
            key={idx}
            className={`${item.color} ${item.rot} transition-transform duration-200 hover:scale-125 hover:rotate-12 inline-block cursor-pointer px-0.5`}>
            {item.char}
          </span>
        ))}
      </h1>
    </div>
  );
};

export default SkribbleText;
