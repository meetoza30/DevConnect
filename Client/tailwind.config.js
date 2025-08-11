/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
      'primary': '#7c3aed',          // Violet
      'primary-light': '#a78bfa',    // Light Violet
      'primary-dark': '#4c1d95',     // Deep Violet
      'accent': '#f59e42',           // Accent Orange
      'background': '#ededed',       // Light BG
      'background-dark': '#18181b',  // Dark mode BG
      'main': '#18181b',        // Main Text
      'muted': '#555770',       // Muted Text
    },
    backgroundImage: {
      'hero-gradient': 'linear-gradient(90deg,#7c3aed 0%,#a78bfa 100%)',
      'card-gradient': 'linear-gradient(135deg,#f5f7fa 0%,#c3cfe2 100%)',
    },
    },
  },
  plugins: [
    require("daisyui")
  ],
}

