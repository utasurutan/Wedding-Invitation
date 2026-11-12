/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          50: '#f5f7f5',
          100: '#e5ece5',
          200: '#cfdccf',
          300: '#adc4ad',
          400: '#85a585',
          500: '#648864',
          600: '#4e6d4e',
          700: '#3f563f',
          800: '#344534',
          900: '#2c392c',
          950: '#161f16',
        },
        champagne: {
          50: '#faf7f2',
          100: '#f3ece1',
          200: '#e7d7be',
          300: '#d9be95',
          400: '#cba56f',
          500: '#b98c50',
          600: '#a37341',
          700: '#835736',
          800: '#6c4731',
          900: '#5a3b2b',
        },
        gold: {
          400: '#d4af37',
          500: '#c59b27',
          600: '#a37b19',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        script: ['"Great Vibes"', 'cursive'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}

