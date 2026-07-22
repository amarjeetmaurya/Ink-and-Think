import type { JSX } from "react/jsx-runtime";

// Color palettes for avatar body
const SKIN_COLORS = [
  "#ff7675", // pastel red/pink
  "#74b9ff", // pastel blue
  "#55efc4", // pastel green
  "#ffeaa7", // pastel yellow
  "#a29bfe", // pastel purple
  "#fd79a8", // pastel pink
  "#e17055", // pastel orange
  "#00cec9", // pastel teal
  "#ffbe76", // pastel amber
  "#badc58", // lime green
];

interface EyeStyle {
  name: string;
  element: JSX.Element;
}
// Eye styles represented as SVG groups
const EYE_STYLES: EyeStyle[] = [
  {
    name: "Normal",
    element: (
      <g>
        <circle
          cx="48"
          cy="55"
          r="9"
          fill="white"
          stroke="#1e1b4b"
          strokeWidth="3"
        />
        <circle cx="48" cy="55" r="3.5" fill="black" />
        <circle
          cx="72"
          cy="55"
          r="9"
          fill="white"
          stroke="#1e1b4b"
          strokeWidth="3"
        />
        <circle cx="72" cy="55" r="3.5" fill="black" />
      </g>
    ),
  },
  {
    name: "Happy",
    element: (
      <g>
        <path
          d="M 40,58 Q 48,46 56,58"
          fill="none"
          stroke="#1e1b4b"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
        <path
          d="M 64,58 Q 72,46 80,58"
          fill="none"
          stroke="#1e1b4b"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
      </g>
    ),
  },
  {
    name: "Bored / Sleepy",
    element: (
      <g>
        <circle
          cx="48"
          cy="55"
          r="9"
          fill="white"
          stroke="#1e1b4b"
          strokeWidth="3"
        />
        <path
          d="M 38,50 L 58,50"
          stroke="#1e1b4b"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="48" cy="58" r="2.5" fill="black" />
        <circle
          cx="72"
          cy="55"
          r="9"
          fill="white"
          stroke="#1e1b4b"
          strokeWidth="3"
        />
        <path
          d="M 62,50 L 82,50"
          stroke="#1e1b4b"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="72" cy="58" r="2.5" fill="black" />
      </g>
    ),
  },
  {
    name: "Wink",
    element: (
      <g>
        {/* Left eye: closed happy */}
        <path
          d="M 40,58 Q 48,46 56,58"
          fill="none"
          stroke="#1e1b4b"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
        {/* Right eye: open */}
        <circle
          cx="72"
          cy="55"
          r="9"
          fill="white"
          stroke="#1e1b4b"
          strokeWidth="3"
        />
        <circle cx="72" cy="55" r="3.5" fill="black" />
      </g>
    ),
  },
  {
    name: "Glasses",
    element: (
      <g>
        {/* Spectacles frame */}
        <rect
          x="36"
          y="44"
          width="22"
          height="18"
          rx="4"
          fill="white"
          stroke="#1e1b4b"
          strokeWidth="3"
        />
        <circle cx="47" cy="53" r="3.5" fill="black" />
        <rect
          x="62"
          y="44"
          width="22"
          height="18"
          rx="4"
          fill="white"
          stroke="#1e1b4b"
          strokeWidth="3"
        />
        <circle cx="73" cy="53" r="3.5" fill="black" />
        {/* Bridge */}
        <path
          d="M 58,53 L 62,53"
          stroke="#1e1b4b"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        {/* Sides */}
        <path
          d="M 36,53 L 28,51"
          stroke="#1e1b4b"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M 84,53 L 92,51"
          stroke="#1e1b4b"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>
    ),
  },
  {
    name: "Excited Star",
    element: (
      <g>
        {/* Left star */}
        <path
          d="M 48,44 L 50.5,49.5 L 56,50.5 L 52,54.5 L 53,60 L 48,57 L 43,60 L 44,54.5 L 40,50.5 L 45.5,49.5 Z"
          fill="#ffeaa7"
          stroke="#1e1b4b"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {/* Right star */}
        <path
          d="M 72,44 L 74.5,49.5 L 80,50.5 L 76,54.5 L 77,60 L 72,57 L 67,60 L 68,54.5 L 64,50.5 L 69.5,49.5 Z"
          fill="#ffeaa7"
          stroke="#1e1b4b"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
      </g>
    ),
  },
];

interface MouthStyle {
  name: string;
  element: JSX.Element;
}
// Mouth styles represented as SVG groups
const MOUTH_STYLES: MouthStyle[] = [
  {
    name: "Big Smile",
    element: (
      <path
        d="M 44,74 Q 60,94 76,74 Z"
        fill="#ff7675"
        stroke="#1e1b4b"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
    ),
  },
  {
    name: "Simple Smile",
    element: (
      <path
        d="M 46,75 Q 60,86 74,75"
        fill="none"
        stroke="#1e1b4b"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
    ),
  },
  {
    name: "Tongue Out",
    element: (
      <g>
        {/* Smile line */}
        <path
          d="M 46,74 Q 60,86 74,74"
          fill="none"
          stroke="#1e1b4b"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        {/* Tongue */}
        <path
          d="M 53,78 C 53,88 67,88 67,78 Z"
          fill="#ff7675"
          stroke="#1e1b4b"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        {/* Line down middle of tongue */}
        <path d="M 60,78 L 60,83" stroke="#1e1b4b" strokeWidth="1.5" />
      </g>
    ),
  },
  {
    name: "Surprised",
    element: (
      <circle
        cx="60"
        cy="78"
        r="7"
        fill="#800020"
        stroke="#1e1b4b"
        strokeWidth="3.5"
      />
    ),
  },
  {
    name: "Worried Line",
    element: (
      <path
        d="M 48,78 L 72,78"
        stroke="#1e1b4b"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
    ),
  },
  {
    name: "Cheeky Mustache",
    element: (
      <g>
        <path
          d="M 46,78 Q 53,70 60,76 Q 67,70 74,78"
          fill="none"
          stroke="#1e1b4b"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M 48,82 Q 60,86 72,82"
          fill="none"
          stroke="#1e1b4b"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </g>
    ),
  },
];

interface HatStyle {
  name: string;
  element: JSX.Element | null;
}
// Hat/Accessory styles represented as SVG groups
const HAT_STYLES: HatStyle[] = [
  {
    name: "None",
    element: null,
  },
  {
    name: "Party Hat",
    element: (
      <g>
        <polygon
          points="60,10 40,40 80,40"
          fill="#fd79a8"
          stroke="#1e1b4b"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        <circle
          cx="60"
          cy="10"
          r="5.5"
          fill="#ffeaa7"
          stroke="#1e1b4b"
          strokeWidth="2.5"
        />
        {/* Stripes */}
        <path
          d="M 48,28 L 68,36"
          stroke="white"
          strokeWidth="3"
          opacity="0.6"
          strokeLinecap="round"
        />
        <path
          d="M 52,18 L 74,26"
          stroke="white"
          strokeWidth="3"
          opacity="0.6"
          strokeLinecap="round"
        />
      </g>
    ),
  },
  {
    name: "Top Hat",
    element: (
      <g>
        <rect
          x="40"
          y="12"
          width="40"
          height="26"
          rx="2"
          fill="#2d3436"
          stroke="#1e1b4b"
          strokeWidth="3.5"
        />
        <rect
          x="32"
          y="34"
          width="56"
          height="7"
          rx="2"
          fill="#2d3436"
          stroke="#1e1b4b"
          strokeWidth="3.5"
        />
        {/* Red Ribbon */}
        <rect x="40.5" y="29.5" width="39" height="4.5" fill="#d63031" />
      </g>
    ),
  },
  {
    name: "Crown",
    element: (
      <g>
        <path
          d="M 38,40 L 40,20 L 50,30 L 60,16 L 70,30 L 80,20 L 82,40 Z"
          fill="#ffeaa7"
          stroke="#1e1b4b"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        {/* Jewels */}
        <circle
          cx="40"
          cy="20"
          r="3"
          fill="#d63031"
          stroke="#1e1b4b"
          strokeWidth="1.5"
        />
        <circle
          cx="60"
          cy="16"
          r="3"
          fill="#0984e3"
          stroke="#1e1b4b"
          strokeWidth="1.5"
        />
        <circle
          cx="80"
          cy="20"
          r="3"
          fill="#d63031"
          stroke="#1e1b4b"
          strokeWidth="1.5"
        />
        <circle cx="50" cy="30" r="2" fill="#2ed573" />
        <circle cx="70" cy="30" r="2" fill="#2ed573" />
      </g>
    ),
  },
  {
    name: "Ribbon Bow",
    element: (
      <g>
        <circle
          cx="60"
          cy="36"
          r="6"
          fill="#e17055"
          stroke="#1e1b4b"
          strokeWidth="3"
        />
        <polygon
          points="60,36 74,28 74,44"
          fill="#e17055"
          stroke="#1e1b4b"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <polygon
          points="60,36 46,28 46,44"
          fill="#e17055"
          stroke="#1e1b4b"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <circle cx="60" cy="36" r="2.5" fill="white" />
      </g>
    ),
  },
  {
    name: "Cowboy Hat",
    element: (
      <g>
        <path
          d="M 32,30 Q 60,12 88,30"
          fill="none"
          stroke="#1e1b4b"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <path
          d="M 34,31 Q 60,14 86,31"
          fill="#badc58"
          stroke="#1e1b4b"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <ellipse
          cx="60"
          cy="24"
          rx="20"
          ry="12"
          fill="#badc58"
          stroke="#1e1b4b"
          strokeWidth="3.5"
        />
        <path
          d="M 40,24 Q 60,28 80,24"
          stroke="#6ab04c"
          strokeWidth="3.5"
          fill="none"
        />
      </g>
    ),
  },
];

interface PeekingAvatar {
  bg: string;          // hex color
  eyes: number;        // index into EYE_STYLES
  mouth: number;       // index into MOUTH_STYLES
  rot: string;         // Tailwind rotation class
  offset: string;      // Tailwind translation class
}

// Pre-configured peeking avatar colors/styles for variety
const PEEKING_AVATARS: PeekingAvatar[] = [
  {
    bg: "#ff7675",
    eyes: 0,
    mouth: 1,
    rot: "-rotate-12",
    offset: "-translate-x-16",
  },
  {
    bg: "#74b9ff",
    eyes: 1,
    mouth: 0,
    rot: "-rotate-6",
    offset: "-translate-x-8",
  },
  {
    bg: "#ffeaa7",
    eyes: 5,
    mouth: 2,
    rot: "rotate-0",
    offset: "translate-x-0",
  },
  {
    bg: "#55efc4",
    eyes: 0,
    mouth: 3,
    rot: "rotate-6",
    offset: "translate-x-8",
  },
  {
    bg: "#a29bfe",
    eyes: 2,
    mouth: 0,
    rot: "rotate-12",
    offset: "translate-x-16",
  },
];

export { SKIN_COLORS, EYE_STYLES, MOUTH_STYLES, HAT_STYLES, PEEKING_AVATARS};
