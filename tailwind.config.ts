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
        impact: {
          green: "#6DAE37",
          "green-hover": "#5F9930",
          "green-light": "#EAF4E2",
          "green-muted": "#86BC4A",
          dark: "#14171A",
          "dark-card": "#1D2124",
          footer: "#E5EFE4",
          teal: "#0A6E78",
          slate: "#4A5568",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;

