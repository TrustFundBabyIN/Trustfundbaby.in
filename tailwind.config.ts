import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          DEFAULT: "#1B3A63",
          deep: "#12294A",
          soft: "#3E5C82",
          muted: "#5B7699",
        },
        marigold: {
          DEFAULT: "#EC9A1E",
        },
        paper: "#FBFAF6",
        growth: "#BFE0C4",
        sage: "#DDE3DA",
        // Legacy colors used by education module pages
        navy: {
          DEFAULT: "#1B3A63",
          mid: "#1E3F6B",
          light: "#2D5A8A",
        },
        gold: {
          DEFAULT: "#EC9A1E",
          light: "#F0B04A",
        },
        cloud: "#F5F4F0",
        stone: "#6B6B65",
        green: {
          DEFAULT: "#4A8B5C",
          light: "#5FA872",
        },
        ink: "#1B1B1B",
        muted: "#7A7A75",
        line: {
          DEFAULT: "#E4E0D6",
          soft: "#EFEDE6",
        },
      },
      fontFamily: {
        display: ['"Fraunces"', "Georgia", "serif"],
        body: ['"Figtree"', "system-ui", "sans-serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "Menlo", "monospace"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        blink: "blink 1.05s steps(2) infinite",
        pulse: "pulse 2.4s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        blink: {
          "0%, 50%": { opacity: "1" },
          "51%, 100%": { opacity: "0" },
        },
        pulse: {
          "0%": { boxShadow: "0 0 0 0 rgba(120,180,130,.7)" },
          "70%": { boxShadow: "0 0 0 9px rgba(120,180,130,0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(120,180,130,0)" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
