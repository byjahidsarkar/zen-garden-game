/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Baloo 2"', 'system-ui', 'sans-serif'],
        mixed: [
          '"Noto Sans Bengali"', '"Noto Sans Devanagari"', '"Noto Sans Arabic"',
          '"Noto Sans Hebrew"', '"Noto Sans Tamil"', '"Noto Sans Georgian"',
          '"Noto Sans Armenian"', '"Noto Sans JP"', '"Noto Sans SC"',
          '"Noto Sans KR"', '"Noto Sans Thai"', '"Noto Sans Khmer"',
          '"Noto Sans Burmese"', '"Noto Sans Sinhala"', '"Noto Sans Kannada"',
          '"Noto Sans Malayalam"', '"Noto Sans Telugu"', '"Noto Sans Gurmukhi"',
          '"Noto Sans Gujarati"', '"Baloo 2"', 'system-ui', 'sans-serif',
        ],
      },
      colors: {
        zen: {
          50: '#f0fdfa', 100: '#ccfbf1', 200: '#99f6e4', 300: '#5eead4',
          400: '#2dd4bf', 500: '#14b8a6', 600: '#0d9488', 700: '#0f766e',
          800: '#115e5a', 900: '#134e4a',
        },
      },
    },
  },
  plugins: [],
};
