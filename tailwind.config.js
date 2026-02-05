/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0E1C17',
        'ink-muted': '#40524B',
        eco: '#148A3A',
        'eco-dark': '#0E5F29',
        mist: '#EEF6F1',
        sand: '#FAFBF8',
        sky: '#2F7AE5',
      },
      fontFamily: {
        display: ['Sora', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['IBM Plex Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['IBM Plex Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
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

