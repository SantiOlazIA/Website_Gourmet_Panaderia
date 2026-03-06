/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#FFFDF8', // Off-white cream background for rustic feel
        primary: {
          DEFAULT: '#FFE600', // Bright Buttery Yellow
          hover: '#E5CF00',
        },
        accent: {
          DEFAULT: '#FF6B81', // Pink
          light: '#FF8A9B',
        },
        dark: '#2A2626', // Softer black/brown for better rustic contrast
      },
      fontFamily: {
        // Enforcing a premium typography approach (Sans-serif stack)
        sans: ['Geist', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'], // Adding a serif for elegant artisanal touches
      },
      borderColor: {
        DEFAULT: '#EAEAEA',
      }
    },
  },
  plugins: [],
}
