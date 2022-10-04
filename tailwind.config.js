/** @type {import('tailwindcss').Config} */

const daisyUi = require('daisyui');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyUi],
  daisyui: {
    themes: ['synthwave'],
  },
};
