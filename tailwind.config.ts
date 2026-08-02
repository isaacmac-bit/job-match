import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        surface: "#0d0d0d",
        panel: "#161514",
        border: "#2a2927",
        accent: {
          DEFAULT: "#eef0e6",
          dim: "#c9cbc0",
        },
        status: {
          approved: "#3ecf8e",
          rejected: "#f06a6a",
          pending: "#e8b750",
        },
      },
      borderRadius: {
        xl: "0.9rem",
      },
    },
  },
  plugins: [],
};
export default config;
