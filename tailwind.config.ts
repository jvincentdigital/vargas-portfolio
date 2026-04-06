import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sand: "#C4A882",
        espresso: "#3D2B1F",
        terracotta: "#8B6347",
        cream: "#F5ECD7",
        olive: "#4A5240",
        clay: "#A0785A",
      },
      fontFamily: {
        display: ['"DM Serif Display"', "serif"],
        body: ['"Plus Jakarta Sans"', "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
