import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        dawn: {
          50: "#fff8f0",
          100: "#ffefd9",
          200: "#ffdba8",
          300: "#ffbf6b",
          400: "#ff9f3d",
          500: "#f97e1f",
          600: "#e05f0f",
          700: "#b8460c",
          800: "#8f3610",
          900: "#742d10",
        },
        harbor: {
          50: "#f2f8fb",
          100: "#e0eef5",
          200: "#bcdce9",
          300: "#8ec1d6",
          400: "#579fbc",
          500: "#357fa0",
          600: "#276485",
          700: "#22506a",
          800: "#1f4358",
          900: "#1c384a",
          950: "#0f2130",
        },
      },
      fontFamily: {
        display: ["ui-serif", "Georgia", "serif"],
        sans: ["ui-sans-serif", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        sunrise:
          "linear-gradient(135deg, #742d10 0%, #e05f0f 45%, #ffbf6b 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
