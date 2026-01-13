/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#1E3A5F',
        ocean: '#1E3A5F', // Keep ocean alias for backward compatibility, maps to navy
        teal: '#0891B2',
        sand: '#F5F7FA',
        coral: '#FF6B6B',
        gray: {
          700: '#4A5568', // For paragraph text
        },
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          'Fira Sans',
          'Droid Sans',
          'Helvetica Neue',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
};
