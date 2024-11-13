/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1890BA',
        secondary: '#1B3765',
        dark: '#231F20',
      },
    },
  },
  plugins: [],
};