/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#a855f7', // purple-500
        background: '#000000',
        surface: '#121212',
        surfaceLight: '#1e1e1e',
        textMain: '#ffffff',
        textMuted: '#9ca3af',
      }
    },
  },
  plugins: [],
}
