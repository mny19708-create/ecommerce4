/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        khmer: ['"Kantumruy Pro"', 'sans-serif'],
        sans: ['Inter', '"Kantumruy Pro"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}