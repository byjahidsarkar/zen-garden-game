/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Baloo 2', 'system-ui', 'sans-serif'],
        bengali: ['Noto Sans Bengali', 'sans-serif'],
        mixed: [
          'Noto Sans Bengali', 'Noto Sans Devanagari', 'Noto Sans Arabic',
          'Noto Sans Hebrew', 'Noto Sans Tamil', 'Noto Sans Telugu',
          'Noto Sans Kannada', 'Noto Sans Malayalam', 'Noto Sans Gurmukhi',
          'Noto Sans Gujarati', 'Noto Sans Sinhala', 'Noto Sans Georgian',
          'Noto Sans Armenian', 'Noto Sans Khmer', 'Noto Sans Thai',
          'Noto Sans KR', 'Noto Sans JP', 'Noto Sans SC', 'Noto Sans TC',
          'Noto Sans Burmese', 'Baloo 2', 'system-ui', 'sans-serif',
        ],
      },
      colors: {
        zen: { 400: '#2dd4bf', 500: '#14b8a6', 600: '#0d9488' },
      },
      animation: {
        'bounce-in': 'bounce-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'fade-in': 'fade-in 0.3s ease-out',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'screen-shake': 'screen-shake 0.4s ease-in-out',
        'tile-land': 'tile-land 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      keyframes: {
        'bounce-in': { '0%': { transform: 'scale(0.3)', opacity: '0' }, '100%': { transform: 'scale(1)', opacity: '1' } },
        'fade-in': { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(45, 212, 191, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(45, 212, 191, 0.6)' },
        },
        'screen-shake': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '25%': { transform: 'translate(-3px, 2px)' },
          '50%': { transform: 'translate(3px, -2px)' },
          '75%': { transform: 'translate(-2px, -3px)' },
        },
        'tile-land': {
          '0%': { transform: 'scaleY(0.8) scaleX(1.1)' },
          '50%': { transform: 'scaleY(1.1) scaleX(0.95)' },
          '100%': { transform: 'scaleY(1) scaleX(1)' },
        },
      },
    },
  },
  plugins: [],
}
