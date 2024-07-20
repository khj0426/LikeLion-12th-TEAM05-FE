const flowbite = require('flowbite-react/tailwind');

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', flowbite.content()],
  darkMode: 'selector',
  theme: {
    colors: {
      PINK_50: '#edbbe7',
      PINK_100: '#c239b3',
      PINK_200: '#af33a1',
      PINK_300: '#6d2064',
      SLATE: '#4A4A68',
      LIGHT_SLATE: '#8c8ca1',
      DORIAN: '#ECF1f4',
      CLOUD: '#F1FcF3',
      PRIMARY: '#4b4ded',
      ONYX: '#0e0e2c',
      WHITE: '#FAFCFE',
    },
    extend: {
      fontFamily: {
        Pretendard: ['Pretendard'],
      },
    },
  },
  plugins: [flowbite.plugin()],
};
