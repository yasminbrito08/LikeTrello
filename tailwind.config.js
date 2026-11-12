/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        foreground: "#ffffff",
        primary: "#0079ff",
        secondary: "#253858",
        "background-color": "#64748b",
        danger: "#c62828",
      },
    },
  },
  plugins: [],
};
