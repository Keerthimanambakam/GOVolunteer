/** @type {import('tailwindcss').Config} */
export default {
  content: ['*',"./index.html","./src/**/*.{js,ts,jsx,tsx}","*"],
  theme: {
    extend: {colors: {
        'paynes_gray':'#4F6D7A',
        'platinum':'#EAEAEA',
        'dutch_white':'#E8DAB2',
        'burnt_seinna':'#DD6E42',
        'persian_orange':'#D59172'
      }},
  },
  plugins: [],
}

