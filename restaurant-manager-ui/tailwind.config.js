/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        inter: ["Inter", "sans-serif"]
      },
      screens: {
        'sm' : '360px',
        'iphone12' : '390px',
        'pixel7' : '412px',
        'ipad' : '820px',
        'xxl' : '1590px'
      },
    },
  },
  plugins: [],
}
