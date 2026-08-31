import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Base Dark Obsidian Backgrounds
        obsidian: {
          DEFAULT: "#0A0A0C",
          950: "#060608",
          900: "#0A0A0C",
          800: "#0F0F13",
        },
        // Surface Charcoal
        charcoal: {
          DEFAULT: "#141418",
          muted: "#18181E",
          elevated: "#1E1E24",
          surface: "#141418",
        },
        // Elevated & Tech Borders
        border: {
          DEFAULT: "#27272A",
          elevated: "#27272A",
          subtle: "#1F1F23",
          active: "#3F3F46",
        },
        // Accents
        crimson: {
          DEFAULT: "#E11D48", // Neon Crimson/Rose
          glow: "#FF2E63",
          muted: "#9F1239",
          dark: "#4C0519",
        },
        gold: {
          DEFAULT: "#F59E0B", // Cyber Gold
          glow: "#FBBF24",
          muted: "#B45309",
          dark: "#78350F",
        },
        cyber: {
          white: "#FAFAFA", // Cyberpunk White
          light: "#F4F4F5",
          gray: "#A1A1AA",
          muted: "#71717A",
          dark: "#0A0A0C",
        },
        // Theme Aliases
        zenji: {
          bg: "#0A0A0C",
          surface: "#141418",
          card: "#111115",
          border: "#27272A",
          crimson: "#E11D48",
          gold: "#F59E0B",
          white: "#FAFAFA",
          muted: "#71717A",
        },
      },
      fontFamily: {
        // Clean grotesque/sans for headers & primary UI
        sans: [
          "var(--font-grotesk)",
          "Space Grotesk",
          "Syne",
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "sans-serif",
        ],
        heading: [
          "var(--font-grotesk)",
          "Space Grotesk",
          "Syne",
          "Cabinet Grotesk",
          "sans-serif",
        ],
        // Monospace for badges, technical specs, SKU, GSM metadata
        mono: [
          "var(--font-mono)",
          "JetBrains Mono",
          "Space Mono",
          "Fira Code",
          "monospace",
        ],
        tech: [
          "var(--font-mono)",
          "JetBrains Mono",
          "Space Mono",
          "Courier New",
          "monospace",
        ],
        japanese: [
          "'Noto Sans JP'",
          "'Hiragino Kaku Gothic ProN'",
          "'Yu Gothic'",
          "sans-serif",
        ],
      },
      boxShadow: {
        "neon-crimson": "0 0 20px -3px rgba(225, 29, 72, 0.45)",
        "neon-crimson-lg": "0 0 35px -5px rgba(225, 29, 72, 0.6)",
        "neon-gold": "0 0 20px -3px rgba(245, 158, 11, 0.45)",
        "neon-white": "0 0 20px -3px rgba(250, 250, 250, 0.3)",
        "cyber-card": "0 10px 30px -10px rgba(0, 0, 0, 0.8)",
      },
      letterSpacing: {
        cyber: "0.25em",
        tech: "0.15em",
        ultra: "0.35em",
      },
      backgroundImage: {
        "cyber-grid": "linear-gradient(to right, rgba(39, 39, 42, 0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(39, 39, 42, 0.15) 1px, transparent 1px)",
        "radial-crimson": "radial-gradient(circle at 50% 0%, rgba(225, 29, 72, 0.15) 0%, transparent 70%)",
        "radial-gold": "radial-gradient(circle at 50% 0%, rgba(245, 158, 11, 0.12) 0%, transparent 70%)",
        "noise-pattern": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.035'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(1000%)" },
        },
        glitch: {
          "0%, 100%": { transform: "translate(0)" },
          "20%": { transform: "translate(-2px, 2px)" },
          "40%": { transform: "translate(-2px, -2px)" },
          "60%": { transform: "translate(2px, 2px)" },
          "80%": { transform: "translate(2px, -2px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.7", transform: "scale(0.98)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        scanline: "scanline 8s linear infinite",
        glitch: "glitch 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        marquee: "marquee 28s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
