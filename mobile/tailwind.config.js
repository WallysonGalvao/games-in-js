/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./src/**/*.{js,tsx,ts,jsx}",
    "./App.{tsx,jsx,ts,js}",
    "./app/**/*.{tsx,jsx,ts,js}",
    "./components/**/*.{tsx,jsx,ts,js}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        gray: {
          100: "#8899a6",
          200: "#38444d",
        },
        pink: "#F231A5",
        blue: {
          100: "#0a0c21",
          200: "#000010",
        },
      },
    },
  },
  plugins: [],
};
