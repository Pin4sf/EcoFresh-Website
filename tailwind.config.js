/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#202527',
        'ink-light': '#6d767a',
        bg1: '#fafaf7',
        bg2: '#f7f2ec',
        primary1: '#b7e4d6',
        primary2: '#86c8b8',
        secondary1: '#b7d4f1',
        secondary2: '#86a6ea',
        accent: '#f7e27a',
        seafoam: '#a8e6cf',
        lilac: '#60a5fa',
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.bg-gradient-radial': {
          'background': 'radial-gradient(circle, var(--tw-gradient-stops))',
        },
      })
    }
  ],
}


