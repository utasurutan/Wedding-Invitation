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
          50: '#f7f8f6',
          100: '#edf1ec',
          200: '#d9e2d7',
          300: '#b8c9b4',
          400: '#91ac8c',
          500: '#71906b',
          600: '#577352',
          700: '#465c42',
          800: '#394a36',
          900: '#2c392a',
          950: '#171f16',
        },
        champagne: {
          50: '#fcfaf7',
          100: '#f6f2ea',
          200: '#ece2d2',
          300: '#dcceb4',
          400: '#cbb692',
          500: '#b89d70',
          600: '#a38456',
          700: '#836744',
          800: '#6c553a',
          900: '#5b4733',
        },
        gold: {
          300: '#ebd197',
          400: '#dfba6d',
          500: '#cca048',
          600: '#ad7e30',
        },
        parchment: {
          50: '#faf8f5',
          100: '#f4ede2',
          200: '#ebdccb',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        display: ['"Cinzel"', 'serif'],
        script: ['"Alex Brush"', 'cursive'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 12s linear infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        }
      },
      backgroundImage: {
        'gold-foil': 'linear-gradient(135deg, #d4af37 0%, #f7e6a7 50%, #aa7c11 100%)',
        'gold-metallic': 'linear-gradient(90deg, #b38728 0%, #fbf5b7 50%, #b38728 100%)',
      }
    },
  },
  plugins: [],
}
