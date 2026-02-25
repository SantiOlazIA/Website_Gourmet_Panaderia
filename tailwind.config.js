/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#FAFAFA', // Off-white clean background 
        primary: {
          DEFAULT: '#FFE600', // Bright Buttery Yellow
          hover: '#E5CF00',
        },
        accent: {
          DEFAULT: '#FF6B81', // Coral/Bubblegum Pink
          light: '#FF8A9B',
        },
        dark: '#111111', // Solid almost-black for contrast text
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
