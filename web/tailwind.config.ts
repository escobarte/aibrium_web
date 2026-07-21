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
        ink: "#1A1A1A",
        cream: "#F7F3EC",
        gold: "#8A6D3B",
        "gold-hover": "#6F5730",
        grey: "#666666",
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Playfair Display", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "1200px",
      },
      boxShadow: {
        card: "0 12px 40px -16px rgba(26,26,26,0.12)",
        float: "0 24px 60px -24px rgba(26,26,26,0.45)",
      },
      borderRadius: {
        btn: "4px",
      },
    },
  },
  plugins: [],
};
export default config;
