/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        hunter: {
          950: '#0c0f12',
          900: '#14181f',
          850: '#1a1f29',
          800: '#222936',
          700: '#323c4e',
          600: '#48556d',
          gold: '#dfaa42',
          goldLight: '#f3c969',
          goldDark: '#b08022',
          parchment: '#f5f0e6',
          ink: '#1d212a'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

