import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        tall: { raw: "(min-height: 1000px)" },
        short: { raw: "(max-height: 1000px)" },
      },
    },
  },
  plugins: [],
};

export default config;
